"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GResponse = void 0;
const common_1 = require("@nestjs/common");
class GResponse {
    constructor(obj) {
        this.status = common_1.HttpStatus.OK;
        this.data = null;
        this.message = '';
        this.error = false;
        if (obj) {
            this.status = obj.status ?? common_1.HttpStatus.OK;
            this.data = obj.data ?? null;
            this.message = obj.message ?? '';
            this.error = obj.error ?? false;
        }
    }
}
exports.GResponse = GResponse;
//# sourceMappingURL=GResponse.js.map