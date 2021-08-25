export class Balance {

  private dollars: number;
  private cents: number;

  constructor(dollars: number, cents: number) {
    this.dollars = dollars;
    this.cents = cents;
  }

  public toString() : string {
    return "$" + (this.dollars + (this.cents / 100)).toFixed(2);
  }

  public get $dollars() : number {
    return this.dollars;
  }

  public set $dollars(value: number) {
    this.dollars = value;
  }

  public get $cents() : number{
    return this.cents;
  }

  public set $cents(value: number) {
    this.cents = value;
  }
}
