/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {ffmpegController} from './ffmpeg.controller';
import {videosourceController} from './videosources.controller';
import {videoStatusController} from './videostatus.controller';
import {appendFile} from 'fs';

// import g from '../../../filenew.tex'

class VIDEOFLOW {
  async executeProcess(inputVideoSource1: string,inputVideoSource2: string, 
    inputVideoSource3: string,inputVideoSource4: string) {
    try {
      const context = {
        userId: '6275bb583af43b4205af521a',
      };

      let arrayInputVideoSource=[
        inputVideoSource1,
        inputVideoSource2,
        inputVideoSource3,
        inputVideoSource4
      ]
      let arrVideosJoin=[]

      let j=2

      for (let i=0; i<j; i++){

        const videoSource1 = await videosourceController.createVideoSource(arrayInputVideoSource[0], context);
        const videoSource2 = await videosourceController.createVideoSource(arrayInputVideoSource[1], context);
        await videoStatusController.createVideoStatus(videoSource1._id,context,'pending')
        await videoStatusController.createVideoStatus(videoSource2._id,context,'pending')

        appendFile(`list${i}.txt`,`${arrayInputVideoSource[0]}\n${arrayInputVideoSource[1]}`,(err)=>{
          if(err){
            throw err
          }
        })
        arrayInputVideoSource.shift()
        arrayInputVideoSource.shift()

        let sourceJoinVideo=await ffmpegController.processVideoJoin(`./list${i}.txt`,videoSource2.fileSources.tem,context, videoSource2._id)
        
        arrVideosJoin.push(sourceJoinVideo)




        

      }
      const videoSourceJoin1 = await videosourceController.createVideoSource(arrVideosJoin[0], context);
      const videoSourceJoin2 = await videosourceController.createVideoSource(arrVideosJoin[1], context);
      await videoStatusController.createVideoStatus(videoSourceJoin1._id,context,'pending')
      await videoStatusController.createVideoStatus(videoSourceJoin2._id,context,'pending')

      appendFile('myList.tx',`${arrVideosJoin[0]}\n${arrVideosJoin[1]}`,(err)=>{throw err})

      let sourceJoinVideos=await ffmpegController.processVideoJoin(`./myList.txt`,videoSourceJoin2.fileSources.tem,context, videoSourceJoin2._id)

      return sourceJoinVideos 
      
    } catch (error) {
      throw error;
    }
  }
}


const tasckFlowController = new VIDEOFLOW();

export {
  tasckFlowController,
};