from _pytest import unittest
from apiai import apiai
import json
import unittest

CLIENT_ACCESS_TOKEN = 'd478a3e3bc084f3fb43136cdf3f7de3d'

class ConversationTests(unittest.TestCase):
    def setUp(self):
        self.ai = apiai.ApiAI(CLIENT_ACCESS_TOKEN)

    def load_text_request_with_quiery(self, query=None, resetContexts=False, entities=None):
        if not query:
            self.assertTrue(False)

        text_requset = self.ai.text_request()
        text_requset.query = query
        text_requset.resetContexts = resetContexts
        text_requset.entities = entities

        response = text_requset.getresponse()
        return json.loads(response.read().decode())

    #1
    #Testing creating new tickets with pre-trained sentence
    def test_start_ticket(self):
        query = 'I wanna submit a ticket'
        response = self.load_text_request_with_quiery(query)
        result = response['result']

        self.assertEqual(result['resolvedQuery'].lower(), query.lower())
        self.assertEqual(result['fulfillment']['speech'],
                         'Sure! Which API you wanna ask about? (Drop down a list to click)')

    #2
    #Testing ticekt generating in conversation
    def test_confirm_ticket(self):
        query = 'No,thank you'
        response = self.load_text_request_with_quiery(query)
        result = response['result']

        self.assertEqual(result['resolvedQuery'].lower(), query.lower())
        self.assertEqual(result['fulfillment']['speech'],
                         "It's my pleasure to help you!")

    #3
    #Testing simple common talk question like asking for the name
    def test_you_name(self):
        query = 'What is your name?'
        response = self.load_text_request_with_quiery(query)
        result = response['result']

        self.assertEqual(result['resolvedQuery'].lower(), query.lower())
        self.assertEqual(result['action'], 'name')
        self.assertTrue(len(result['contexts']) == 1)

        context = result['contexts'][0]

        self.assertEqual(context['name'], 'name_question')
        self.assertTrue(len(context['parameters']) == 4)

        parameters = context['parameters']
        param = parameters.get('param', None)

        self.assertTrue(param)
        self.assertEqual(parameters['param'], 'blabla')

        hello_with_context = self.load_text_request_with_quiery('hello', resetContexts=False)

        self.assertTrue(len(hello_with_context['result']['contexts']) == 1)
        self.assertEqual(hello_with_context['result']['contexts'][0]['name'], 'name_question')

        hello_without_context = self.load_text_request_with_quiery('hello', resetContexts=True)

        self.assertTrue(len(hello_without_context['result']['contexts']) == 0)

    #4 Testing indentifying API Categories entity defined and corresponding response
    def test_user_entities(self):
        query = 'Chatbot API'
        entities = [
            apiai.Entity(
                'API requests',
                [
                    apiai.Entry('Chatbot API', ['Chatbot API', 'Chatbot','chatbot']),
                    apiai.Entry('AR Therater API', ['Therater', 'Therater','therater']),
                ]
            )
        ]
        response = self.load_text_request_with_quiery(query, entities=entities)
        self.assertTrue(response['result']['metadata']['intentName'] == 'API requests')
        self.assertTrue(response['result']['fulfillment']['speech'] == 'Could you provide us more details about your problem?')
