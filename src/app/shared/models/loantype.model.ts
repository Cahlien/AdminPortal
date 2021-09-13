export class Loantype {

    private typeName: String;
    private description: String;
    private apr: Number;
    private numMonths: Number;
    private id: String;


	constructor($typeName: String, $description: String, $apr: Number, $numMonths: Number, $id?: String) {
		
		this.typeName = $typeName;
		this.description = $description;
		this.apr = $apr;
		this.numMonths = $numMonths;
        this.id = $id!;
	}


    /**
     * Getter $Id
     * @return {String}
     */
	public get $id(): String {
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
     * Getter $Description
     * @return {String}
     */
	public get $description(): String {
		return this.description;
	}

    /**
     * Getter $apr
     * @return {Number}
     */
	public get $apr(): Number {
		return this.apr;
	}

    /**
     * Getter $numMonths
     * @return {Number}
     */
	public get $numMonths(): Number {
		return this.numMonths;
	}

    /**
     * Setter $Id
     * @param {String} value
     */
	public set $id(value: String) {
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
     * Setter $Description
     * @param {String} value
     */
	public set $description(value: String) {
		this.description = value;
	}

    /**
     * Setter $apr
     * @param {Number} value
     */
	public set $apr(value: Number) {
		this.apr = value;
	}

    /**
     * Setter $numMonths
     * @param {Number} value
     */
	public set $numMonths(value: Number) {
		this.numMonths = value;
	}

}
