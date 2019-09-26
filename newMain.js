const now = new Date()

function query(selector) {
    return document.querySelector(selector)
}

function querys(selector) {
    return document.querySelectorAll(selector)
}

class Field {
    construtor(input, validator) {
        this.input = input
        this.validator = validator
        this.value = input.value
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

    validate() {
        const value = this.input.value

        if (this.validator(value)) {
            this.markValid()
        } else {
            this.markInvalid()
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

const validatePresence = new Validate(function(value) {
    if (!value.trim()) {
        return false
    } else {
        return true
    }
}, "must be filled out")



const nameField = new Field(query('#name'), validatePresence)

console.log(nameField)
console.log(nameField.input, nameField.validator)
document.querySelector('#parking-form').addEventListener('submit', (event) => {
    event.preventDefault()
    
})