const now = new Date()

function query(selector) {
    return document.querySelector(selector)
}

function querys(selector) {
    return document.querySelectorAll(selector)
}

// Must grab all input-fields and then throw through a loop with an if line 
// that can then distribute the validators for each input-field 
// dependent upon their ID

const inputFields = querys('input')



class Field {
    constructor(input, validators) {
        this.input = input
        this.validators = validators
    }

    errorClearer() {
        let errors = querys('.text-danger')
        for(let error of errors) {
            error.remove()
        }

    }

    errorAdder(errors) {
        let label = this.input.closest('.input-field').firstElementChild.innerText
        for(let error of errors) {
            const errorNode = document.createElement('p')
            errorNode.classList.add('input-hint', 'text-danger')
            errorNode.innerText = `${label}${error}`
            this.input.parentNode.appendChild(errorNode)
        }
    }

    markValid() {
        let parent = this.input.closest('.input-field')
        parent.classList.add('input-valid')
        parent.classList.remove('input-invalid')
    }

    markInvalid() {
        let parent = this.input.closest('.input-field')
        parent.classList.add('input-invalid')
        parent.classList.remove('input-valid')
    }

    validate() {
        const value = this.input.value

        let errorList = []

        for (validator of this.validators) {
            if(!validator.validate(value)) {
                errorList.push(validator.errorMessage)
            } 
        }

        if (errorList.length === 0) {
            this.markValid()
        } else {
            this.markInvalid()
            this.errorClearer(errorList)
        }

        return errorList.length === 0 
    }

    isDateTodayorLater() {
        let userDate = new Date();
        return userDate >= now;
    }

}

class Validate {
    constructor(test, errorMessage) {
        this.test = test
        this.errorMessage = errorMessage || "must be filled out"
    }

    validate(value) {
        this.test(value)
    }


}

// Validate Presence
const validatePresence = new Validate(value => !!value, "is required")
// // Valdiate Car Year
// const validateCarYear = new Validate(function(carYear) {
//     if (carYear > now.getFullYear() && carYear < 1900) {
//         return false
//     } else {
//         return true
//     }
// }, "must be between 1900 and this year")
// // Validate Start Date
// const validateStartDate = new Validate(function(startDate) {
//     if (!this.isDateTodayorLater()) {
//         return false
//     } else {
//         return true
//     }
// }, "must be in the future")

// function createMyFields(id) {
//     let newField = new Field(field, validations)
// }

const validations = {
    "name": [validatePresence, validateName], // 
    // "car-info": [validatePresence, validateCar], // 
    // "start-date": [validateDate], // 
    // "days": [validatePresence, validateDays], // 
    // "credit-card": [validatePresence, validateCredit], // 
    // "cvv": [validatePresence, validateCVV],
    // "expiration": [validateExpiration],
}

// creatMyFields
// Validate Days
// const validateDays = new Validate(function(days) {
//     if (!this.)
// }, "must be a number as well as between 1 and 30.")
query('#parking-form').addEventListener('submit', function(event) {
    event.preventDefault()

    
})