const fs = require('fs');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'C:\\Users\\murali\\Desktop\\Hackerrank\\backend\\.env' });

async function test() {
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "default_secret", { expiresIn: "12h" });
  const form = new FormData();
  form.append('image', fs.createReadStream('C:\\Users\\murali\\Desktop\\Hackerrank\\logo.jpeg'));

  const fetch = (await import('node-fetch')).default;
  try {
    const res = await fetch('http://localhost:5001/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error(err);
  }
}

test();
