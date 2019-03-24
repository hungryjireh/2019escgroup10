from _pytest import unittest
from apiai import apiai
import json
import unittest
from django.test import TestCase
from .models import Message
from django.core.exceptions import ValidationError
from .chatbot import Speech

CLIENT_ACCESS_TOKEN = ''


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
    def test_intent_switch(self):
        query = 'I wanna submit a ticket'
        response = self.load_text_request_with_quiery(query)
        result = response['result']

        self.assertEqual(result['result']["metadata"]["intentName"],
                         'ticket_start')

        query = 'API DevOps'
        response = self.load_text_request_with_quiery(query)
        result = response['result']
        self.assertEqual(result['result']["metadata"]["intentName"],
                         'ticket_API_Selection')

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

    #4
    # Testing indentifying API Categories entity defined and corresponding response
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

        # 5
        # Testing responding to common questions
        def test_user_entities(self):
            query = 'What do your company do?'
            response = self.load_text_request_with_quiery(query)
            result = response['result']

            self.assertEqual(result['result']["metadata"]["intentName"],
                             'Company_info')
            self.assertTrue(
                response['result']['fulfillment']['speech'] == 'Short description about the company')


class DatabaseTests(TestCase):
    #1
    #Testing submiting a valid ticket by the correct conversation inputs
    def test_chatbot_ticket_creation(self):
        speech = Speech()
        querys = [
            'I want to submit a ticket',
            'API DevOps', #categories
            'Test case for chatbot', #description
            'sadasd@gmail.com'#email
        ]
        for query in querys:
            response = speech.respond_to(query)
        ticket_content = speech.getTicket()
        Message.objects.create(categories=ticket_content[0], issue_description=ticket_content[1], priority=ticket_content[2], resolved=ticket_content[3])
        testmessage = Message.objects.get(categories='API DevOps')
        self.assertEqual(testmessage.issue_description, 'Test case for chatbot')

    #2
    #Testing submitting a new ticket with an invalid email address
    def test_chatbot_response_to_invalid_email(self):
        try:
            speech = Speech()
            querys = [
                'I want to submit a ticket',
                'API DevOps',
                'Test case for chatbot',
                'sadasdwmail.com'  # incalid email
            ]
            for query in querys:
                response = speech.respond_to(query)
            ticket_content = speech.getTicket()
            Message.objects.create(categories=ticket_content[0], issue_description=ticket_content[1],
                                   priority=ticket_content[2], resolved=ticket_content[3])
        except:
            self.assertRaises(ValueError)

    #3
    #Testing submitting a new ticket with empty content
    def test_chatbot_response_empty_content(self):
        try:
            speech = Speech()
            querys = [
                'I want to submit a ticket',
                'API DevOps',
                '',# empty content
                'sadasdwmail.com'
            ]
            for query in querys:
                response = speech.respond_to(query)
            ticket_content = speech.getTicket()
            Message.objects.create(categories=ticket_content[0], issue_description=ticket_content[1],
                                   priority=ticket_content[2], resolved=ticket_content[3])
        except:
            self.assertRaises(ValueError)
