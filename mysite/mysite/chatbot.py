import sys
import json
# from mysite.models import Message
import os.path
try:
    import apiai
except ImportError:
    sys.path.append(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
    )

CLIENT_ACCESS_TOKEN = 'd478a3e3bc084f3fb43136cdf3f7de3d'
ai = apiai.ApiAI(CLIENT_ACCESS_TOKEN)

def say(words):
    print('Robot Say: ' + words)  # Represent robot 'say' function

class Speech():
    def __init__(self):
        self.interrupt_intents = ['']  # List of interruption events.
        self.response = ''
        self.action = ''
        self.action_bot = ''
        self.check = ''
        self.categories = ''
        self.issue_description = ''
        self.priority = ''
        # self.message_create = Message


    def listen(self):
        words = input();
        print('Console: (you said) ' + words + '\n')
        return words

    def respond_to(self, words):
        '''send the speech text to Dialogflow and return corresponding reply'''

        request = ai.text_request()
        request.lang = 'en'  # Language code
        request.session_id = "chatbot-test"
        request.query = words

        json_response = request.getresponse().read().decode('utf-8')
        dict = json.loads(s=json_response)  # Convert the json received to dict

        response = dict['result']['fulfillment']['speech']
        self.response = response
        say(response)


        if dict['result']["metadata"] != {}:
            self.action_bot = dict['result']['action']

            if self.action_bot == 'double_check_name.double_check_name-yes':
                self.action = 'true'
            elif self.action_bot == 'double_check_name.double_check_name-no':
                self.action = 'false'
            else:
                self.action = ''

        try:
            if dict['result']["metadata"] != {}:  # Being empty means that now the talk intent belongs to common talk
                intent = dict['result']["metadata"]["intentName"]
                print(dict)
                print(intent)
                self.event_check(intent,words)
        except KeyError:
            pass

    def event_check(self, intent,words):
        if intent == 'ticket_start':
            self.categories = words
            print(
"""There are a few API options you can ask about:
    API DevOps 
    Chart as a Service   
    Recruitment Platform   
    Aesop   
    Travel Marketplace   
    Banking Lifestyle App   
    AR Car Visualizer   
    AR Car Manual   
    AR Gamification   
    AR Theatre   
    AR Menu   
    AI Wealth Manager   
    Multilingual Chatbot   
    AI Translator   
    Digital Butler   
    Video Analytics   
    Sentiments Analysis   
    ACNAPI MFA Login   
    Ticketing Platform   
    Smart Lock   
    Smart Home   
    Smart Parking   
    Smart Restaurant   
    Queuing System   
    IoT Led Wall   
            """)
        if intent == 'ticket_API_Selection':
            self.categories = words
        if intent == 'ticket_problem':
            self.issue_description = words
        if intent == 'ticket_confirm':
            # Message.objects.create(categories=self.categories, issue_description=self.issue_description, priority='1', resolved='no')
            print("Your ticket has been created successfully!")
        # if intent == "query_ticket":
        #

    def common_talk(self):
        words = self.listen()
        self.respond_to(words)
        return self.common_talk()


while(1):
    test = Speech()
    say("Welcome to our API Service Page! I'm an intelegent robot who can help you handle issues. How can I help you?")
    test.common_talk()
