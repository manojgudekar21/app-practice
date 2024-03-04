export class User {
    constructor(public email: string,
        public localId: string,
        private _tokenId: string,
        private _expirationDate: Date) { }

    get token() {
        if (!this._expirationDate || new Date() > this._expirationDate) {
            return null
        }
        return this._tokenId
    }
}