from collections import Counter
import time
from rest_framework.throttling import SimpleRateThrottle
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib import messages
from django.core.cache import cache
from django.core.mail import EmailMultiAlternatives


class UserLoginRateThrottle(SimpleRateThrottle):
    scope = 'loginAttempts'
    cache.clear()
    def get_cache_key(self, request, view):
        user = User.objects.filter(username=request.data.get('username'))
        ident = user[0].pk if user else self.get_ident(request)

        return self.cache_format % {
            'scope': self.scope,
            'ident': ident
        }

    def allow_request(self, request, view):
        """
        Implement the check to see if the request should be throttled.
        On success calls `throttle_success`.
        On failure calls `throttle_failure`.
        """
        if self.rate is None:
            return True

        self.key = self.get_cache_key(request, view)
        if self.key is None:
            return True

        self.history = self.cache.get(self.key, [])
        self.now = self.timer()

        while self.history and self.history[-1] <= self.now - self.duration:
            self.history.pop()

        if len(self.history) >= self.num_requests:
            # IsAuthenticated=False
            # return self.wait()
            return self.throttle_failure()

        if len(self.history) >= 0:
            data = Counter(self.history)
            for key, value in data.items():
                if value == 2:
                    return self.throttle_failure()
        return self.throttle_success(request)

    def throttle_success(self, request):
        """
        Inserts the current request's timestamp along with the key
        into the cache.
        """
        user = User.objects.filter(username=request.data.get('username'))
        if user:
            self.history.insert(0, user[0].id)
        self.history.insert(0, self.now)
        self.cache.set(self.key, self.history, self.duration)
        return True

    def throttle_failure(self):
        text_content = "An account has been compromised"
        from_email, to = 'ACNAPI-SUTD <hello@acnapi.icu>', 'hungryjireh@gmail.com'
        msg = EmailMultiAlternatives(from_email, [to])
        msg.send()
        return False

