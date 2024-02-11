export class CreateProductError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class FileUploadError extends CreateProductError {
    constructor(message: string) {
        super(message)
    }
}

export class CreateProductMainError extends CreateProductError {
    constructor(message: string) {
        super(message)
    }
}

export class CreateProductOptionalsError extends CreateProductError {
    constructor(message: string) {
        super(message)
    }
}
