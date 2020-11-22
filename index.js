var getusermedia=require('getusermedia');
var Peer=require('simple-peer');
getusermedia(
    {
        video:true,
        audio:true
    },
    function(err,stream){
        if(err) console.log(err)

        var peer=new Peer({
            initiator:location.hash ==="#init",
            trickle:false,
            stream:stream
        })
      peer.on('signal',function(data){
          console.log(data)
          document.getElementById("yourID").value=JSON.stringify(data);
      })

      document.getElementById("connect").addEventListener('click',function(){
          console.log("Button Clicked")
          var otherID=JSON.parse(document.getElementById("otherID").value)

          peer.signal(otherID)
      })

      document.getElementById("send").addEventListener('click',function(){
          console.log("Send Button")

          var urmsg=document.getElementById("msg").value

          peer.send(urmsg)
      })

      peer.on('data',function(data){
          console.log(data)
          document.getElementById("messages").textContent+=data +"\n"
      })

      peer.on('stream',function(stream){
          showWebcam(stream)
      })
    }
)

function showWebcam(stream){
    const video=document.createElement('video');
    document.getElementById('video').appendChild(video);

    video.srcObject=stream;
    video.play();
}