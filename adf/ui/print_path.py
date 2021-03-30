# Embedded file name: ./print_path.py
import os.path
print '__file__:', __file__
print 'os.path.dirname(__file__):', os.path.dirname(__file__)
print 'os.path.abspath(os.path.dirname(__file__)):', os.path.abspath(os.path.dirname(__file__))