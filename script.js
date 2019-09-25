console.log('Your JS is indeed connected!')

const now = new Date()
let validity = 0 

function query(selector) {
    return document.querySelector(selector)
}

function querys(selector) {
    return document.querySelectorAll(selector)
}

function markInvalid(field) {
    let parent = field.closest(".input-field")
    parent.classList.remove('input-valid')
    parent.classList.add('input-invalid')
    let childError = document.createElement('p')
    // Adding class' from Shoelace
    childError.classList.add("text-danger", "input-hint")
    childError.innerHTML = errorMessage
    // Puts that kiddo below the parent
    parent.appendChild(childError)
}

function markValid(field) {
    let parent = field.closest(".input-field")
    parent.classList.remove('input-invalid')
    parent.classList.add('input-valid')
}

// VALIDATION SECTION START

function validateName(field) {
    if (!field.value.trim()) {
        console.log("not good")
        markInvalid(field)
    } else {
        console.log("you good")
        markValid(field)
    }
}

function validateCar(field) {
    if (parseInt(field.value) >= 1900 && parseInt(field.value) <= now.getFullYear()) {
        markValid(field)
        validity++
    } else {
        markInvalid(field)
    }
}

function validateDate(field) {
    if (isDateTodayorLater(field.value)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateDays(field) {
    let fieldNumber = Number(field.value)
    if (fieldNumber >= 1 && fieldNumber <= 30) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateCredit(field) {
    if (validateCardNumber(field.value)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateCVV(field) {
    let fieldNumber = Number(field.value)
    if (field.value.length === 3 && !isNaN(fieldNumber)) {
        markValid(field)
        validity++
    } else {
        markInvalid(field, errorMessage)
    }
}

function validateExpiration(field) {
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
    "name":  validateName,
    "car-info": validateCar,
    "start-date": validateDate,
    "days": validateDays,
    "credit-card": validateCredit,
    "cvv": validateCVV,
    "expiration": validateExpiration,
}

// CLASS SECTION START
class Form {
    constructor() {
        this.fields = [] // NodeList - all of your inputs
    }

    addField(field) {
        return this.fields.push(field)
    }

    getTotal() {

    }

    checkAllValid() {
        // if all valid, then getTotal()
        // Check via the validity points 
    }

    
}

class Field { // Field should be the input tag 
    constructor(field, validator) {
        this.field = field
        this.id = field.id;
        this.value = field.value.trim();
        this.validator = validator
    }

    validation() {
        return this.validator(field)
    }

}

// CLASS SECTION END

query('#submit-button').addEventListener('submit', function(event) {
    event.preventDefault()

      
    let tags = querys('input') // Get all of those fields 
    let inputs = new Form() // Create the form where we will have all of our fields stored
    console.log("This is your form", inputs)
    let keys = Object.keys(validations) // Get those keys out of the validations dictionary 
    console.log("These are your keys", keys)

    for(let i = 0; i < tags.length; i++) { // Work through it 
        if (tags[i].id in keys) { // For whatever reason, this isn't returning true even tho I thought the "in" operator would work. 
            console.log(tags[i])  // None of this happens but when I check, tags[i].id IS IN keys so I don't know what I'm doing wrong
            let field = new Field(tags[i], validations[tags[i].id])
            console.log(field)
            inputs.addField(field) // Append it to the form each time. 
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

    if (validity === 9) {
        let numOfDays = document.querySelector('#days')
        let startDate = query('#start-date')
        let total = sumOfDays(numOfDays, startDate)
        let totalDiv = query('#total')
        let totalEle = document.createElement('div')
        totalEle.classList.add('text-bold', 'text-success')
        totalEle.innerHTML = total + " is your total for parking"
        totalDiv.appendChild(totalEle)
        validity = 0
    } else {
        let errorChild = query('.text-success')
        errorChild.remove()
        validity = 0
    }
})