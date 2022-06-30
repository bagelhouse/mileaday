
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '../../../../.env')})
const config = {
    type: process.env.FBSA_type,
    project_id: process.env.FBSA_project_id,
    private_key_id: process.env.FBSA_private_key_id,
    private_key: process.env.FBSA_private_key,
    client_email: process.env.FBSA_client_email,
    client_id: process.env.FBSA_client_id,
    auth_uri: process.env.FBSA_auth_uri,
    token_uri: process.env.FBSA_token_uri,
    auth_provider_x509_cert_url: process.env.FBSA_auth_provider,
    client_x509_cert_url: process.env.FBSA_client_x509_cert_url
  }

export default config