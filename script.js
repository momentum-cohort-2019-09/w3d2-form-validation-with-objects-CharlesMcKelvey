console.log('Your JS is indeed connected!')

const now = new Date()
let validity = 0 

function query(selector) {
    return document.querySelector(selector)
}

function querys(selector) {
    return document.querySelectorAll(selector)
}



// VALIDATION SECTION START

function validateName(field, errorMessage) {
    if (!field.value.trim()) {
        console.log("not good")
        markInvalid(field, errorMessage)
    } else {
        console.log("you good")
        markValid(field)
    }
}

function validateCar(field, errorMessage) {
    if (parseInt(field.value) >= 1900 && parseInt(field.value) <= now.getFullYear()) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateDate(field, errorMessage) {
    if (isDateTodayorLater(field.value)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateDays(field, errorMessage) {
    let fieldNumber = Number(field.value)
    if (fieldNumber >= 1 && fieldNumber <= 30) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateCredit(field, errorMessage) {
    if (validateCardNumber(field.value)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateCVV(field, errorMessage) {
    let fieldNumber = Number(field.value)
    if (field.value.length === 3 && !isNaN(fieldNumber)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateExpiration(field, errorMessage) {
    let expire = field.value.split('/')
    expire[0] = Number(expire[0])
    expire[1] = Number(expire[1])
    if (expire[1] > (now.getYear() - 100) && expire[0] > 0 && expire[0] < 13) {
        markValid(field)
        validity++
    } else if (expire[1] === (now.getYear() - 100) && expire[0] >= (now.getMonth() + 1) && expire[0] < 13) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validatePresence(field, errorMessage) {
    if (!field.value.trim()) {
        markInvalid(field, errorMessage)
    } else {
        markValid(field)
    }
}

function isDateTodayorLater(date) {
    let userDate = new Date(date);
    return userDate >= now;
};

function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
};

// VALIDATION SECTION END

// add a dictionary with the id key's and validation values
let validations = {
    "name":  [validatePresence, validateName], // 
    "car-info": [validatePresence, validateCar], // 
    "start-date": [validateDate], // 
    "days": [validatePresence, validateDays], // 
    "credit-card": [validatePresence, validateCredit], // 
    "cvv": [validatePresence, validateCVV],
    "expiration": [validateExpiration],
}

// CLASS SECTION START
class Validator {
    constructor(test, errorMessage) { 
        this.test = test // This is a defined function when instantiated
        this.errorMessage = errorMessage || "is required" // This is a specific error message for that validate function
    }

    validate(value) {
        return this.test(value)
    }
}



let validatePresence = new Validate(value => !!value, "must be filled out") 
// The !! will switch it from false to true to false, 
// essentially giving you the value it was while also being able to test truthiness/falsiness
let validateCarInfo = new Validate(function(number) {
    if(number < 1900 && number > now.getFullYear()) {
        
    } else {
}, " is invalid. The given year must be between 1900 and this year.")
class Field { // Field should be the input tag 
    constructor(field, validators) {
        this.field = field
        this.validators = validators || []
    }

    validate() {
        const value = this.field.value
    }

    markInvalid() {
        let parent = this.field.closest(".input-field")
        parent.classList.remove('input-valid')
        parent.classList.add('input-invalid')
        let childError = document.createElement('p')
        // Adding class' from Shoelace
        childError.classList.add("text-danger", "input-hint")
        childError.innerHTML = errorMessage
        // Puts that kiddo below the parent
        parent.appendChild(childError)
}

    markValid() {
        let parent = this.field.closest(".input-field")
        parent.classList.remove('input-invalid')
        parent.classList.add('input-valid')
}

}

// CLASS SECTION END

function gather() {
    let tags = querys('.input-field')
    // Get all of those fields 
    
    console.log("This is your form", inputs)
    let keys = Object.keys(validations) // Get those keys out of the validations dictionary 
    console.log("These are your keys", keys)

    for (let i = 0; i < tags.length; i++) { // Work through it 
        if (keys.includes(tags[i].id)) { // For whatever reason, this isn't returning true even tho I thought the "in" operator would work. 
            console.log(tags[i])  // None of this happens but when I check, tags[i].id IS IN keys so I don't know what I'm doing wrong
            let field = new Field(tags[i], validations[tags[i].id]) // This will grab it no matter where it is
            console.log(field)
            form.addField(field) // Append it to the form each time. 
        }
        // let key = validDict[keys[i]]
        // let field = new Field(inputs[i], validDict[i][inputs[i]])
        // We have the inputs and the keys
        // At first we check to see if the inputs.id is in the keys
        //     If so, then create the Field class with inputs[i] (the whole field) and validDict[inputs[i].value] (the validator for that field)
        //     
        // How to check for truthiness 
    }
    console.log("This is your form after for-loop", inputs)
}

query('#submit-button').addEventListener('submit', function(event) {
    event.preventDefault()
    // Go through and validate each field
    // Clear errors
    // If all valid checkAllValid(), 
    //     getTotal for parking
    //     Set validty to 0
    //     Question: in a separate class, can we adjust another classes constructor value? 
    //               I want to increase validity as each field is valid and set back to 0 otherwise. 
    // Else, 
    //     Mark those that are invalid as such.
    //     Set validity to 0

    
})