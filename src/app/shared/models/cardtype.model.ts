export class Cardtype {

    private id: Number;
    private typeName: String;
    private baseInterestRate: Number;


	constructor($id: Number, $typeName: String, $baseInterestRate: Number) {
		this.id = $id;
		this.typeName = $typeName;
		this.baseInterestRate = $baseInterestRate;
	}

        /**
     * Getter $id
     * @return {Number}
     */
	public get $id(): Number {
		return this.id;
	}

    /**
     * Getter $typeName
     * @return {String}
     */
	public get $typeName(): String {
		return this.typeName;
	}

    /**
     * Getter $baseInterestRate
     * @return {Number}
     */
	public get $baseInterestRate(): Number {
		return this.baseInterestRate;
	}

    /**
     * Setter $id
     * @param {Number} value
     */
	public set $id(value: Number) {
		this.id = value;
	}

    /**
     * Setter $typeName
     * @param {String} value
     */
	public set $typeName(value: String) {
		this.typeName = value;
	}

    /**
     * Setter $baseInterestRate
     * @param {Number} value
     */
	public set $baseInterestRate(value: Number) {
		this.baseInterestRate = value;
	}


}
