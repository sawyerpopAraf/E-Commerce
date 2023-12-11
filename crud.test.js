const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const URL = 'http://localhost:3000';

// Test suite
describe('testing--login--crud', () => {
  let tokenCookie;
  let categoryId
  const timestamp = new Date().getTime()
  
  test('POST /login - success', async () => {
    const credentials = { login: 'admin@noroff.no', password: 'P@ssword2023' };
    const response = await request(URL).post('/login').send(credentials);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');

    tokenCookie = response.headers['set-cookie']; 
  });

  test('GET /admin/category - success', async () => {
    const response = await request(URL).get('/admin/category')
                   .set('Cookie', tokenCookie);
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<h2 class="text-center mb-4">Categories</h2>')
 });

  test('GET /admin/category - without token', async () => {
    const response = await request(URL).get('/admin/category')
    expect(response.statusCode).toBe(401);
  });

  test('POST /admin/addcategory - success', async () => {
    const category={categoryname:"TEST_CATEGORY"+timestamp}
    const {body} = await request(URL).post('/admin/addcategory')
                   .send(category)
                   .set('Cookie',tokenCookie)
     console.log(body)
     expect(body.status).toEqual('success')
     expect(body.data).toHaveProperty('id')
          categoryId=body.data.id;
          console.log(categoryId)
  });

  test('PUT /admin/updatecategory - success', async () => {
    const newCategory={newcategory:"test_category"+timestamp}
    const {body}=await request(URL).put(`/admin/updatecategory/${categoryId}`)                 
                  .send(newCategory)
                  .set('Cookie',tokenCookie)
     console.log(body)
     expect(body.status).toEqual('success')
   });

  







});
