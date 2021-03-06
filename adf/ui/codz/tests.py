# Embedded file name: ./codz\tests.py
"""
This file demonstrates two different styles of tests (one doctest and one
unittest). These will both pass when you run "manage.py test".

Replace these with more appropriate tests for your application.
"""
from django.test import TestCase

class SimpleTest(TestCase):

    def test_basic_addition(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        self.failUnlessEqual(2, 2)


__test__ = {'doctest': '\nAnother way to test that 1 + 1 is equal to 2.\n\n>>> 1 + 1 == 2\nTrue\n'}