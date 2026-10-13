

age = 18 

pusha = age >=10 and age <90
print(pusha)

#fstring 
name = "Atharva"
print(f"Your a legend {name}")

name.lower()
name.upper()
sentence = "Your a legend {name}"
sentence.title()

message = "I love Python programming with Python"

# Check if something exists
print("Python" in message)
print(message.startswith("I"))
print(message.endswith("Python")) 

# Find position
print(message.find("Python"))
print(message.count("Python"))

# Replace
new_message = message.replace("Python", "JavaScript")
print(new_message) 


#if elif else 
temp  = 94

if temp > 90 :
    print("hot")
elif temp > 93 :
    print("mild Hot")
else:
    print("cold")

has_ticket = False
age = 18

if has_ticket:
    if age >= 18:
         print("Enjoy the movie!")
    else:
        print("Needs supervision!")
else:
    print("Please buy a ticket!")

for  i in range (0, 10, 2):
    print(i)


fruits = ["apple", "banana", "orange"]

# Get items
print(fruits[0])
print(fruits[1])
print(fruits[-1])
print(fruits[-2])

# Slicing
print(fruits[0:2])
print(fruits[1:])

def greet():
    print("Helllo World!")
greet() 

def greet(name):
    print(f"hii! {name}")
greet(name="Dave")
#you have to always keep the non-default value parameter first then the default value parameter
def greet(last_name, first_name="John"):
    print(f"Hello, {first_name} {last_name}")


greet (last_name="Ebbelaar", first_name="Dave")

def calculate_total(price):
    tax_rate = 0.08 
    discount = 10

    tax = price * tax_rate
    final_price = price + tax - discount
    print(f"Total: ${final_price}")

# Order matters!
calculate_total(100) # $98

#Return Value 
def add_print(a, b):
    print(a + b)

print_result = add_print(a=5, b=10)


def add_return(a, b):
    return a + b

result = add_return(a=5, b=10)
print(result + 19)

def simple_function():
    numbers = [1, 2, 3, 4, 5]
    first_number = numbers [0]
    last_number = numbers [-1]
    return first_number, last_number

f, l = simple_function()

print(f)
print(l)

import random 

print(random.choice(['heads', 'tails']))

import requests

def get_weather(latitude, longitude):
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m")
    data = response.json()
    return data['current']['temperature_2m']

# Get temperature for different cities
paris_temp = get_weather(48.85, 2.35)
london_temp = get_weather(51.50, -0.12)
tokyo_temp = get_weather(35.68, 139.69)

print(f"Paris: {paris_temp}°C")
print(f"London: {london_temp}°C")
print(f"Tokyo: {tokyo_temp}°C")