  var pictureSource;   // picture source
  var destinationType; // sets the format of returned value

  // Wait for PhoneGap to connect with the device

  document.addEventListener("deviceready",onDeviceReady,false);

  // PhoneGap is ready to be used!
  //
  function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
  }

  // Called when a photo is successfully retrieved
  //
  function onPhotoDataSuccess(imageData) {
    setImagePathVariable(imageData);
    $.mobile.changePage($("#page-map"));
  }

  function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
  }

  // Called if something bad happens.
  function onFail(message) {
    alert('Failed because: ' + message);
  }

  function setImagePathVariable(variable)
  {
    window.imagePath = variable;
  }

  function getImagePathVariable()
  {
    return(window.imagePath);
  }