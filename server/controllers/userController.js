const mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   });

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// pool.getConnection(function(err, connection) {
//     if(err) {
//         throw err;
//     console.log("not connected!")
//     }

    
// })

//connect to db


//View Users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
    if(err) {
        throw err;
        console.log(`Connected as ID ${connection.threadId}`);
    }
    connection.query('SELECT * FROM users', (err, rows) => {
        connection.release();
        if(!err){
            res.render('home', {rows});
    
        }else{
            
            console.log(err);
        }
        console.log('The data furm user table: \n', rows);
     })}
     
)}

exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
    if(err) {
        throw err;
    }

    let searchTerm = req.body.search;
    connection.query('SELECT * FROM users WHERE name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        connection.release();
        if(!err){
            res.render('home', {rows});
    
        }else{
            
            console.log(err);
        }
        console.log('The data furm user table: \n', rows);
     })}
     
)}

exports.form = (req, res) => {
    res.render('add-user');
}

exports.addUser = (req, res) => {

    const { name, last_name, email, password, comments} = req.body;
    pool.getConnection((err, connection) => {
        if(err) {
            throw err;
        }
    
        
        connection.query('INSERT INTO users SET name = ?, last_name = ?, email = ?, password = ?, comments = ?', [name, last_name, email, password, comments], (err, rows) => {
            connection.release();
            if(!err){
                res.render('add-user', { alert: 'User has been added successfully!'} );
        
            }else{
                
                console.log(err);
            }
            console.log('The user was registered');
         })}
         
    )
}

exports.edit = (req, res) => {
    
    pool.getConnection((err, connection) => {
    if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
    
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release();
        if(!err){
            res.render('edit-user', {rows});
    
        }else{
            
            console.log(err);
        }
        console.log('The data furm user table: \n', rows);
     })}
     
)}

exports.update = (req, res) => {
    const { name, last_name, email, password, comments} = req.body;
    pool.getConnection((err, connection) => {
    if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
    
    connection.query('UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, comments = ? WHERE id = ?', [name, last_name, email, password, comments, req.params.id], (err, rows) => {
        connection.release();
        if(!err){
            pool.getConnection((err, connection) => {
                if(err) throw err;
                connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                    if(err) throw err;
                    res.render('edit-user', {rows, alert: `${name} has been updated`});
                })
            })
            
    
        }else{
            
            console.log(err);
        }
        console.log('The data furm user table: \n', rows);
     })}
     
)}


exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as ID' + connection.threadId);

        connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();
            if(!err){
                res.redirect('/');
            } else{console.log(err);}
        })
    }
)}

exports.viewuser = (req, res) => {
    
    pool.getConnection((err, connection) => {
    if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
    
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release();
        if(!err){
            res.render('view-user', {rows});
    
        }else{
            
            console.log(err);
        }
        console.log('The data furm user table: \n', rows);
     })}
     
)}


// exports.editform = (req, res) => {
   
// }