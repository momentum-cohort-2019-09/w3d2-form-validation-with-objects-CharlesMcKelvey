const now = new Date()

function query(selector) {
    return document.querySelector(selector)
}

function querys(selector) {
    return document.querySelectorAll(selector)
}

const validations = {
    "name": [validatePresence], // 
    "car-info": [validatePresence, validateCarInfoField], // 
    "start-date": [validateDate], // 
    "days": [validatePresence, validateDays], // 
    "credit-card": [validatePresence, validateCredit], // 
    "cvv": [validatePresence, validateCVV],
    "expiration": [validateExpiration],
}

class Field {
    constructor(input, validator) {
        this.input = input
        this.validator = validator
    }

    markValid() {
        let parent = this.input.closest('.input-field')
        parent.classList.remove('input-invalid')
        parent.classList.add('input-valid')
    }

    markInvalid() {
        let parent = this.input.closest('.input-field')
        parent.classList.remove('input-valid')
        parent.classList.add('input-invalid')
        // Creating the error element
        let childError = document.createElement('p')
        // Adding class' from Shoelace
        childError.classList.add("text-danger", "input-hint")
        childError.innerHTML = errorMessage
        // Puts that kiddo below the parent
        parent.appendChild(childError)
    }

    getValue() {
        // const input = this.input.value
        return this.input.value
    }

    validate() { 
        const value = this.input.value

        if (this.validator(value)) {
            this.markValid()
            return true
        } else {
            this.markInvalid()
            return false
        }
    }

}

class Validate {
    constructor(test, errorMessage) {
        this.test = test
        this.errorMessage = errorMessage || "is required"
    }

    validate(value) {
        return this.test(value)
    }
}

class Form {
    constructor() {
        this.fields = []
    }

    addField(field) {
        this.fields.push(field)
    }

    checkAll() {
        let valid = true
        // Loop through the fields in Form. If any are false, set valid to false
        // 
        for (let field of this.fields) {
            let fieldIs = field.validate
            if (!fieldIs) {
                valid = false
                break
            }

        }
        return fieldIs // Could be true or false WHO KNOWS! 
    }

    createMyFields() {
        let inputs = querys('input')
        for(let input of inputs) {
            let id = input.id
            let newField = newField(input, validations[id])
            this.fields.addField(newField)
        }

    }
}

const validatePresence = new Validate(function(value) {
    if (!value.trim()) {
        return false
    } else {
        return true
    }
}, "must be filled out")

const validateCarInfoField = new Validate(function(value) {
    if(value < 1900 || value > now.getFullYear()) {
        return false
    } else {
        return true
    }
}, "must be a car year between 1900 and this year.")

const validateDate = new Validate(function(value) {
    let userDate = new Date(query('#start-date'))
    let plusOne = userDate.getDate() + 1
    userDate = userDate.setDate(plusOne)

    if (userDate < now) {
        return false
    } else {
        return true
    }
}, "must be in the future.")

const validateDays = new Validate(function(value) {
    if (value < 1 || value > 30) {
        return false
    } else {
        return true
    }
}, "must be between 1 and 30.")

const nameField = new Field(query('#name'), validatePresence)
const carInfoField = new Field(query('#car-info'), validateCarInfoField)



document.querySelector('#parking-form').addEventListener('submit', (event) => {
    event.preventDefault()

    let form = new Form()
    form.createMyFields()
    form.checkAll()
})