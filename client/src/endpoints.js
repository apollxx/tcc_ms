const baseUrl = "https://ms.dev/"
export const endpoints = {
    get: {
        users: {
            currentUser: baseUrl + "api/users/currentuser",
            indexProviders: baseUrl + "api/users/providers",
            showProvider: (id) => { return baseUrl + "api/users/providers/" + id }
        },
        products: {
            indexProvider: (id) => { return baseUrl + "api/products/provider/" + id },
            show: (id) => { return baseUrl + "api/products/" + id }
        },
        orders: {
            indexUser: (param) => { return baseUrl + `api/orders/user/${param}` },
            showClient: (providerId) => { return baseUrl + "api/orders/client/" + providerId }
        }
    },
    post: {
        users: {
            signup: baseUrl + "api/users/signup",
            signin: baseUrl + "api/users/signin",
            signout: baseUrl + "api/users/signout"
        },
        products: {
            new: baseUrl + "api/products"
        },
        orders: {
            new: baseUrl + "api/orders"
        }
    },
    put: {
        orders: {
            update: baseUrl + "api/orders",
            completeOrder: (id) => { return (baseUrl + "api/orders/" + id + "/completed") }
        }
    }
}