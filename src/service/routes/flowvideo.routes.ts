import {Router} from 'restify-router';
import {videoFlowController} from '../controllers/videoflow.controller';
import {tasckFlowController} from '../controllers/taskflow.controller';

const routerFlowInstance = new Router();

routerFlowInstance.post('/processvideo', async (req, res) => {
  try {
    const {inputvideo} = req.body;
    res.json({inputvideo});
    await videoFlowController.executeProcess(inputvideo);
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({success: false, error: true, message: errorMessage});
  }
});

routerFlowInstance.post('/processvideoJoin', async (req, res) => {
  try {
    const {pathVideoI,pathVideoII,pathVideoIII,pathVideoIV} = req.body;

    let response=await tasckFlowController.executeProcess(pathVideoI,pathVideoII,pathVideoIII,pathVideoIV)
    res.json({response})
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.json({success: false, error: true, message: errorMessage});
  }
});


export default routerFlowInstance;
