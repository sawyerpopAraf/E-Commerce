const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const URL = 'http://localhost:3000';

// Test suite
describe('testing--login--crud', () => {
  let tokenCookie;
  let categoryId
  let productId
  //const timestamp = new Date().getTime()
  
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
    const category={categoryname:"TEST_CATEGORY"}
    const {body} = await request(URL).post('/admin/addcategory')
                   .send(category)
                   .set('Cookie',tokenCookie)
     console.log(body)
     expect(body.status).toEqual('success')
     expect(body.data).toHaveProperty('id')
          categoryId=body.data.id;
          console.log("categoryId "+categoryId)
  });

  test('PUT /admin/updatecategory - success', async () => {
    const newCategory={newcategory:"test_category"}
    const {body}=await request(URL).put(`/admin/updatecategory/${categoryId}`)                 
                  .send(newCategory)
                  .set('Cookie',tokenCookie)
     expect(body.status).toEqual('success')
   });


  test('GET /admin/products - success', async () => {
    const response=await request(URL).get(`/admin/products`)                 
                  .set('Cookie',tokenCookie)
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<h2 class="text-center mb-4">Products</h2>')
   });

   test('POST /admin/addproduct - success', async () => {
    const product={name:"TEST_PRODUCT",price:0,description:"Nothing",imageUrl:"nothing",quantity:0,brandId:1,categoryId:categoryId}
    const {body} = await request(URL).post('/admin/addproduct')
                   .send(product)
                   .set('Cookie',tokenCookie)
     expect(body.status).toEqual('success')
     expect(body.data).toHaveProperty('price')
     productId=body.data.id
     console.log("productid "+productId)
    });

    test('PUT /admin/updateproduct - success', async () => {
      const newProduct={name:"test_product",price:1,description:"Nothingtest",imageUrl:"nothingtest",quantity:1,brandId:1,categoryId:categoryId}
      const {body}=await request(URL).put(`/admin/updateproduct/${productId}`)                 
                    .send(newProduct)
                    .set('Cookie',tokenCookie)
       expect(body.status).toEqual('success')
     });

     //testing soft delete
     test('DELETE /admin/deleteProduct (softdelete) - success', async () => {
      const {body}=await request(URL).delete(`/admin/deleteproduct/${productId}`)                 
                   .set('Cookie',tokenCookie)
       console.log(body)
       expect(body.status).toEqual('success')
       expect(body.data).toHaveProperty('result')
       expect(body.data.result.deleted).toBe(true)
     });

     //delete product from database
    test('DELETE product from database- success', async () => {
      const {body}=await request(URL).delete(`/admin/deletetest/${productId}`)                 
                   .set('Cookie',tokenCookie) 
       expect(body.status).toEqual('success')
       expect(body.data).toHaveProperty('result')
       });
  
       //delete category from database
     test('DELETE /category/id success', async () => {
        const {body}=await request(URL).delete(`/admin/category/${categoryId}`)                 
                     .set('Cookie',tokenCookie)
        expect(body.status).toEqual('success')
         expect(body.data).toHaveProperty('result')
         });

         //login with invalid user
  
         test('POST /login - fail', async () => {
          const credentials = { login: 'admin@noro.no', password: 'P@ssword20' };
          const {body} = await request(URL).post('/login').send(credentials);
          console.log(body)     
          expect(body.status).toEqual('fail');
          
      });
});
