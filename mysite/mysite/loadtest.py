from locust import HttpLocust, TaskSet

def login(l):
    r = l.client.get('')
    l.client.headers['Referer'] = l.client.base_url
    l.client.post('',
                     {'email': 'admin', 'password': 'Happyhappy96',
                      'csrfmiddlewaretoken': r.cookies['csrftoken']})


def logout(l):
    #l.client.post("/logout", {"username":"ellen_key", "password":"education"})
    pass

def index(l):
    l.client.get("/staff")


class UserBehavior(TaskSet):
    tasks = {index: 2}

    def on_start(self):
        login(self)

    def on_stop(self):
        logout(self)

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
