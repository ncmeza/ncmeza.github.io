

class MeditionObject {
    min_value
    max_value
    meditions

    MeditionObject(min_value, max_value) {
        this.max_value = min_value
        this.max_value = max_value
    }

    get getMinValue() {
        return this.min_value
    }

    get getMaxValue() {
        return this.max_value
    }

    set setMinValue(value) {
        this.min_value = value
    }

    set setMaxValue(value) {
        this.max_value = value
    }
}