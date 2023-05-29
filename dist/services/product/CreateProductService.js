"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProductService {
    execute({ name, price, description, banner, category_id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validar se os campos estão preenchidos.
            if (name === '') {
                throw new Error("Nome está em branco!");
            }
            if (price === '') {
                throw new Error("Preço está em branco!");
            }
            if (description === '') {
                throw new Error("Descrição está em branco!");
            }
            if (category_id === '') {
                throw new Error("Categoria está em branco!");
            }
            else {
                const category = yield prisma_1.default.category.findFirst({
                    where: {
                        id: category_id
                    }
                });
                if (!category) {
                    throw new Error("Categoria não cadastrada!");
                }
            }
            const product = yield prisma_1.default.product.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    banner: banner,
                    category_id: category_id,
                    user_id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    category_id: true
                }
            });
            return product;
        });
    }
}
exports.CreateProductService = CreateProductService;
