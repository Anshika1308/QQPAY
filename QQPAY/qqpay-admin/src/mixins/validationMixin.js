const validationMixin = {
    data() {
        return {
            showError: false,
            errorMessage: null,
            errorResponse: null,
        }
    },
    computed: {
        errorList() {
            let errorList = []
            if (this.errorResponse != null) {
                //eslint-disable-next-line
                for (const [key, value] of Object.entries(this.errorResponse)) {
                    errorList.push(...value)
                }
            }

            return errorList
        }
    },
    methods: {
        validateState(name, form, isInForm = true) {
            debugger // eslint-disable-line no-debugger
            if (form) {
                const { $dirty, $error } = form[name]
                var dirtyFormResult = $dirty ? ($error ? false : null) : null
                return dirtyFormResult
            } else {
                const { $dirty, $error } = isInForm ? this.$v.form[name] : this.$v[name]
                var dirtyResult = $dirty ? ($error ? false : null) : null
                return dirtyResult
            }
        },
        validateCollectionState(collection, name, index) {
            const { $dirty, $error } = collection.$each[index][name]
            var dirtyResult = $dirty ? ($error ? false : null) : null
            return dirtyResult
        },
        isValid(name, isInForm = true) {
            const { $dirty, $error } = isInForm ? this.$v.form[name] : this.$v[name]
            return $dirty ? ($error ? false : true) : true
        },
        validForm(form){
            debugger; // eslint-disable-line no-debugger
            this.showError = false
            if(form) {
                debugger; // eslint-disable-line no-debugger
                form.$touch()
                if(form.$error) {
                    debugger; // eslint-disable-line no-debugger
                    return false
                }
            } else {
                debugger; // eslint-disable-line no-debugger
                this.$v.form.$touch()
                this.$v.$touch()
                debugger; // eslint-disable-line no-debugger
                if (this.$v.form.$error || this.$v.$error) {
                    return false
                }
            }
            return true
        },
        handleError(error){
            this.errorMessage = error.errorMessage
            this.errorResponse = null

            if(error.errors){
                this.errorMessage = error.errors
            }

            this.showError = true
        }
    }
}
export default validationMixin