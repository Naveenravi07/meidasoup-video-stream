"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        if (!this.schema)
            return value;
        const parsedValue = this.schema.safeParse(value);
        if (parsedValue.success) {
            return parsedValue.data;
        }
        else {
            throw new common_1.BadRequestException(parsedValue.error.errors.map((e) => ({ field: e.path, message: e.message })));
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zodValidationPipe.js.map