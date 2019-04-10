from rest_framework.throttling import BaseThrottle
from rest_framework.exceptions import Throttled

from .models import Message

class MessagePostRequestThrottle(BaseThrottle):
    def allow_request(self, request, view):
        request_limit=Message.objects.filter(user=request.user)
        if self.rate is None:
            return True
        self.key = self.get_cache_key(request, view)
        if self.key is None:
            return True
        if len(self.history) >= 3:
            data = Counter(self.history)
            for key, value in data.items():
                if value == 15:
                    raise Throttled(detail=(
            "You have reached the limit of 15 open requests. "
            "Please wait until your existing requests have been "
            "evaluated before submitting additional disputes. "))



