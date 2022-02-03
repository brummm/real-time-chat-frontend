interface config {
  API_URL: string
}
const dev: config = {
  API_URL: 'http://localhost:3301'
}

const prod: config = {
  API_URL: ''
}

export default process.env.NODE_ENV === 'development' ? dev : prod;
