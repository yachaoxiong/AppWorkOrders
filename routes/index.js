var express             =   require('express');
var router              =   express.Router();
var Worker            =   require('../models/worker');
var WorkerOrder       =   require('../models/workerOrder');
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/workder',(req,res,next)=>{
 Worker.find({},(err,workers)=>{
     res.json(workers);
 })


});
/* Create a worker */
router.post('/worker', function(req, res, next) {
   Worker.create({
        Name:req.body.Name,
        CompanyName:req.body.CompanyName,
        Email:req.body.Email
   },(err,worker)=>{
       res.json('Worker was created!!');
   })
});

/* Delete a worker */
router.delete('/:_id/worker', function(req, res, next) {
    let _id = req.params._id;
    Worker.remove({_id:_id},(err,worker)=>{
        if (err) {
            console.log(err);
            res.json(err).status(501);
        }
        else {
            res.json(worker).status(200);
        }
    })
});

/* Create a worker Order*/
router.post('/workderOrder', function(req, res, next) {
    let Name =req.body.Name;
    let WorkerId =req.body.WorkerId;
    WorkerOrder.create({
     Title:         req.body.Title,
     Description:   req.body.Description,
     Deadline:      req.body.Deadline,
     max:           req.body.max,
 },(err,workerOrder)=>{
      //res.json('workder Order was created!! ');
     if(typeof WorkerId === 'string'){
         workerOrder.Workers.push({WorkerId:WorkerId,Name:Name});

     }
     else if (typeof WorkerId === 'object') {
          for(let i=0;i<req.body.max;i++){
             workerOrder.Workers.push({WorkerId: WorkerId[i],Name:Name[i]});
     }
     }
     workerOrder.save(function (err) {
         res.json('workder Order was created!! ');
     })
     })
});


/* Assigning a worker to an order */
router.put('/:_id/workerOrder', function(req, res, next) {
    let _id = req.params._id;
    let WorkerId =req.body.WorkerId;
    let Name =req.body.Name;
    WorkerOrder.findById({_id:_id},(err,workerOrder)=>{

        if(typeof WorkerId === 'string'){
            workerOrder.Workers.push({ WorkerId: WorkerId,Name:Name});

        } else if (typeof WorkerId === 'object') {
            for(let i=0;i<workerOrder.max;i++){
                workerOrder.Workers.push({WorkerId: WorkerId[i],Name:Name[i]});
            }
        }
        workerOrder.save(function (err) {
            res.json('workder Order was created!! ');
        })
    })
});

/* Get all worker Order For a specific worker */
router.get('/workerOrder/:_id/worker', function(req, res, next) {
    let _id = req.params._id;
    WorkerOrder.find({"Workers.WorkerId":_id},(err,workerOrders)=>{
        if (err) {
            console.log(err);
            res.json(err).status(501);
        }
        else {
            res.json(workerOrders).status(200);
        }
    })
});



module.exports = router;
