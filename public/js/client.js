$("#loginform").submit(function(event) {
  event.preventDefault()
  var data = {}
  data.email = $("#email").val()
  data.password = $("#login-password").val()

  $.post('/auth/signup', data)
})


// $("#signupform").submit(function(event) {
//   event.preventDefault()
//   var data = {}
//   data.firstName = $("#email").val()
//   data.lastName = $("#login-password").val()
//   data.email = $("#email").val()
//   data.age = $("#login-password").val()
//   data.gender = $("#email").val()
//   data.country = $("#country2").val()
//   data.password = $("#password").val()
//   $.post('/auth/signup', data)
// })
