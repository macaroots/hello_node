class Router {
    constructor() {
        this.routes = {};
    }

    register(method, url, requestHandler) {
        if (this.routes[method] == null) {
            this.routes[method] = {};
        }
        this.routes[method][url] = requestHandler;
    }

    getRequestHandler(method, url) {
        try {
            return this.routes[method][url];
        } catch {
            return null;
        }
    }
    
}

module.exports = Router;