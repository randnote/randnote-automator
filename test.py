import js2py
from js2py import require
result, tempfile = js2py.run_file("keygen.js");
result= tempfile.sayHello("samantha");
print(result);