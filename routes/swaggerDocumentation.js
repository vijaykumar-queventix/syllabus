/**
 * @swagger
 * /:
 *   post:
 *    summary: register post api
 *    description: user can register here
 *    requestBody :
 *     required : true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         firstname:
 *          type: string
 *         lastname:
 *          type: string
 *         phone_number : 
 *          type: number
 *         email :
 *          type : string
 *          example: 'example@mail.com'
 *         password :
 *          type : string
 *         access_token :
 *          type : string
 *         status :
 *          type : number
 *         created_date :
 *          type : string
 *         last_login :
 *          type : string
 *    responses:
 *       200:
 *         description: user registered successfully
 */


/**
 * @swagger
 * /login:
 *   post:
 *    summary: Login post api
 *    description: user can register here 
 *    requestBody :
 *     required : true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties :
 *         email:
 *          type : string
 *          example: 'example@mail.com'
 *         password :
 *          type : string
 *    responses:
 *       200:
 *         description: user logged in
 */


 /**
  * @swagger
  * /update/{id}:
  *   put:
  *    summary: update put api
  *    description: user can update there profile here 
  *    security:
  *      - jwt: []
  *    parameters:
  *     - in: path
  *       name: id
  *    requestBody:
  *     required: true
  *     content:
  *      application/json:
  *       schema:
  *        type: object
  *        properties :
  *         email:
  *          type: string
  *         firstname:
  *          type: string
  *         lastname:
  *          type: string
  *         phone_number:
  *          type: number
  *    responses:
  *     200:
  *      description: user updated successfully 
  */


  /**
  * @swagger
  * /delete/{id}:
  *   delete:
  *    summary: delete api
  *    description: user can delete their profile here 
  *    security:
  *      - jwt: []
  *    parameters:
  *     - in: path
  *       name: id
  *    requestBody:
  *     required: true
  *     content:
  *      application/json:
  *       schema:
  *        type: object
  *        properties :
  *         email:
  *          type: string
  *    responses:
  *     200:
  *      description: User Deleted Successfully 
  */

