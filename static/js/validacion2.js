/**
 * @author Andrés Benítez
 */
//Funcion para cargar las especialidad del bachiller
	function cargar_especialidad(carrera) {
		//elotro.options.length = 0;
		var especialidad;
		if (carrera == "Ingenieria Maritima") {
			especialidad = {"Especialidad" : "", "Ciencias" : "Ciencias", "Tec. Medio" : "Tec. Medio"}; 
		}

		if (carrera == "Ingenieria Ambiental") {
			especialidad = {"Especialidad" : "", "Ciencias" : "Ciencias", "Tec. Medio" : "Tec. Medio"}; 
		}

		if (carrera == "Ingenieria Informatica") {
			especialidad = {"Especialidad" : "", "Ciencias" : "Ciencias", "Tec. Medio" : "Tec. Medio"}; 
		}

		if (carrera == "Administracion") {
			especialidad = {"Especialidad" : "", "Ciencias" : "Ciencias", "Humanidades" : "Humanidades",  "Tec. Medio" : "Tec. Medio"}; 
		}
		if (carrera == "Turismo") {
			especialidad = {"Especialidad" : "",
						    "Ciencias" : "Ciencias", 
						    "Humanidades" : "Humanidades",
						    "Tec. Medio" : "Tec. Medio",  
						    "Ccs Basicas y Tecnología" : "Ccs Basicas y Tecnología"};
		}
		
		return especialidad;
	}
	
	//Función de retorna la edad.	
	function edad(Fecha) {
		var edad = 0;
		var values=Fecha.split("/");
        var dia = values[0];
        var mes = values[1];
        var anio = values[2];
        Fecha = mes+"/"+dia+"/"+anio;
		fecha = new Date(Fecha);
		hoy = new Date();
		edad = parseInt((hoy-fecha)/365/24/60/60/1000);
		return edad;
	}

//Formato a los inputs del formulario
//Formato para algunas entradas del Formulario.
$(function() {
	$('.identificacion').mask('S-BZZZZZZZ', {
		translation : {
			'S' : {
				pattern : /(E|V)/,
				optional : true
			},
			'Z' : {
				pattern : /[0-9]/,
				optional : true
			},
			'B' : {
				pattern : /[A-Z0-9]/,
				optional : true
			}
		}
	});
	$('.date').mask('00/00/0000');
	$('.year').mask('ZZZZ', {
		translation : {
			'Z' : {
				pattern : /[0-9]/,
				optional : true
			}
		}
	});
	$('.codigo').mask('ZZZZ', {
		translation : {
			'Z' : {
				pattern : /[0-9]/,
				optional : true
			}
		}
	});
	$('.phone').mask('0000 000 00 00');
	$('.rusnieu').mask('00000000000');
	$('.decimal').mask("00,00");
});

//Busqueda de la Ciudad de nacimiento a partir del estado seleccionado
$(document).ready(function(){	 
	 $('#Estados').change(function(){ 
			var seleccion = $('#Estados').val();
			if(seleccion == ""){
				$("#Ciudad > option").remove();
				$('#Ciudad').append('<option value="">Ciudad de Nacimiento</option>');
			}else{
				$("#Ciudad > option").remove();
				var info = { id_estados : seleccion }; 
				$.ajax({
					url: "/registro/velero/select_ciudades",
					cache: false,
					type: "POST",
					data: info, 
					success: function(Ciudad){ 
						//alert (Ciudad);
						$('#Ciudad').append('<option value="">Ciudad de Nacimiento</option>');
						$.each(Ciudad,function(id,city){
							var opt = $('<option >');
							opt.text(city);
							opt.val(id);
							$('#Ciudad').append(opt);
						});
					}
				});
			}
		});
});

//Se realiza la busquedas que se necesitan para la conseguir la dirección exacta
$(document).ready(function(){
	 $('#lugarU').change(function(){ 
			var seleccion = $('#lugarU').val();
			if(seleccion == 0){
				$("#municipioU > option").remove();
				$('#municipioU').append('<option value="">Municipio</option>');
			}else{
				$("#municipioU > option").remove();
				var info = { id_estado :$('#lugarU').val()};
				$.ajax({
					url: "/registro/select/select_municipio",
					cache: false,
					type: "POST",
					data: info, 
					success: function(municipio){ 
					    //alert(municipio);
						$('#municipioU').append('<option value="">Municipio</option>');	
						$.each(municipio,function(id,mun){ 
							var opt = $('<option >'); 
							opt.text(mun);
							opt.val(id);
							$('#municipioU').append(opt); 
						});
					}
				});
			}
		});
	//Eleccion de la parroquia.
	$('#municipioU').change(function(){ 
			var seleccion = $('#municipioU').val();
			if(seleccion == 0){
				$("#parroquiaU > option").remove();
				$('#parroquiaU').append('<option value="">Parroquia</option>');
			}else{
				$("#parroquiaU > option").remove();
				var info = { id_municipio :$('#municipioU').val()}; 
				$.ajax({
					url: "/registro/select/select_parroquia",
					cache: false,
					type: "POST",
					data: info, 
					success: function(parroquia){
					    //alert(parroquia);
						$('#parroquiaU').append('<option value="">Parroquia</option>');	
						$.each(parroquia,function(id,por){ 
							var opt = $('<option >'); 
							opt.text(por);
							opt.val(id);
							$('#parroquiaU').append(opt);
						});
					}
				});
			}
		});
				
});

//Validación de todos los campos que se encuentran el formulario.
$(document).ready(function(){
	// Generate a simple captcha
	$('#cedula').focus();
	$('#cedula').blur(function() {
		var cedula = $(this).val();
		if(cedula != ""){
			var cedula = cedula.split("-");
			var info = {
				identi : cedula[1]
			};
			$.ajax({
				type : 'POST',
				url : '/registro/cedula/verCedula',
				cache : false,
				data : info,
				success : function(msg) {
					if(msg == "limite"){
						swal({
							title: "",
  							text: "La cantidad de plaza de Aspirantes alcanzó el limite ",
  							type: "error",
  							showCancelButton: false,
  							confirmButtonClass: "btn-info",
  							confirmButtonText: "OK",
  							closeOnConfirm: true
						},function(){
					  		document.location=("http://www.umc.edu.ve/umc/velero-2015");
						});
					}
					if(msg == "in"){
						swal({
							title: "",
  							text: "Aspirante ya registrado",
  							type: "error",
  							showCancelButton: false,
  							allowEscapeKey : false,
  							showescbuton : false,
  							closeOnConfirm: false,
  							showLoaderOnConfirm : true,
						},function(){
							 setTimeout(function() {
					  			window.location.href ="/registro/velero/constancia/"+cedula[1];},1000);
						});	
						
					}
					if(msg == false){
						/*swal({
							title: "¡Alerta!",
  							text: "Su cedula no esta registrada en nuestra Base de Datos",
  							type: "warning",
  							showCancelButton: false,
  							allowEscapeKey : false,
  							showescbuton : false,
  							closeOnConfirm: false,
  							showLoaderOnConfirm : true,
						},
						function(){
							 setTimeout(function() {
					  			window.location.href ="http://www.umc.edu.ve";},1000);
						});*/	
						swal("","Su cedula no esta registrada en la Base de Datos \n Aspirante Bachiller No Asignado \n Presione OK para continuar con la Preinscripcion ","warning");
					  /*$('#apellidos').val('').prop('readonly', false);
						$('#nombres').val('').prop('readonly', false);*/
						$('#aspirante').val('noAsignado').prop('readonly', true);
						$('#periodo').val('2016').prop('readonly', true	);
					}else{
						var datos = new Array();
						
						$.each(msg, function(index,value){
							datos[index] = value;	
						});
	
						if(datos[2] != "Asignado"){
							if(datos[2] == "Cola"){
								swal("","Bienvenido Aspirante en Lista de "+datos[2]+" ","success");
							}else{
								swal("","Bienvenido Aspirante en Lista de "+datos[2]+" ","success");
							}
							//$('#apellidos').val(datos[0]).prop('readonly', true);
							//$('#nombres').val(datos[1]).prop('readonly', true);
							$('#aspirante').val(datos[3]).prop('readonly', true);
							$('#periodo').val('---').prop('readonly', true);
						}
						if(datos[3] == "2017-01"){
							swal({
							title: "¡Alerta!",
  							text: "Aspirante Asignado para otro Periodo. (" + datos[3] + ")",
  							type: "warning",
  							showCancelButton: false,
  							allowEscapeKey : false,
  							showescbuton : false,
  							closeOnConfirm: false,
  							showLoaderOnConfirm : true,
						},
						function(){
							 setTimeout(function() {
					  			window.location.href ="http://www.umc.edu.ve";},1000);
						});
						}else{
							swal("","Bienvenido Aspirante "+datos[2]+" "+datos[3],"success");
							//$('#apellidos').val(datos[0]).prop('readonly', true);
							//$('#nombres').val(datos[1]).prop('readonly', true);
							$('#aspirante').val(datos[2]).prop('readonly', true);
							$('#periodo').val(datos[3]).prop('readonly', true);
						}
					}
				}
			});
		}
		
	});
	
	$('#Datepicker1').blur(function() {
		var fecha = $(this).val();
		var age = edad(fecha);
		$('#edad').val(age).prop('readonly', true);
	});
	
	$('#carrera').change(function(){
		var carrera = $(this).val();
		var age = $('#edad').val();
		
		if ((age == "" || age == "NaN" ) && (carrera == "Ingenieria Maritima")) {
			swal({
				title : "",
				text : "Por favor debe indicar su la fecha de nacimiento",
				type : "warning",
				showCancelButton : false,
				confirmButtonClass : "btn-info",
				confirmButtonText : "OK",
				closeOnConfirm : true
			}, function() {
				$("#especialidad > option").remove();
				$('.date').focus();
			});
		}
		
		if ((age > 21) && (carrera == "Ingenieria Maritima")){
			swal({
				title : "",
				text : "Aspirante ha superado la edad para la Carrera. \n\n Requisito aprobado para el ingreso al Programa de Formación de Ingeniería Marítima en CONSEJO UNIVERSITARIO mediante Providencia Nº CUE-006-011-V-2015 de fecha 18 de mayo de 2015.",
				type : "error",
				showCancelButton : false,
				confirmButtonClass : "btn-info",
				confirmButtonText : "OK",
				closeOnConfirm : true
			}, function() {
				document.location = ("http://www.umc.edu.ve");
			});
		}
		
		$("#especialidad > option").remove();
		var especialidades = cargar_especialidad(carrera);
		$.each(especialidades, function(texto,valor){
			var opt = $('<option >');
			opt.text(texto);
			opt.val(valor);
			$('#especialidad').append(opt);
		});
	});
	
	$('#formficha').formValidation({
		message : 'Este valor no es Valido',
		excluded : ':disabled',
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			cedula : {
				validators : {
					notEmpty : {
						message : 'La cedula es requerida'
					},
					stringLength : {
						max : 10,
						message : 'La cedula no puede pasar de 20 Caracteres'
					},
					regexp : {
						regexp : /^(E|V)\-[A-Z0-9_\.]+$/,
						message : 'La cedula esta mal escrita ejem: V-12345678'
					}
				}
			},
			apellidos : {
				row : '.col-xs-12',
				row : '.col-md-6',
				validators : {
					notEmpty : {
						message : 'Este campo es obligatorio'
					},
					stringLength : {
						max : 100,
						message : 'Este campo solo permite 100 Caracteres'
					},
					regexp : {
						regexp : /^([A-Z(Ñ)]{1}[(ñáéíóú)a-z]*\s?){1,2}$/,
						message : 'El Primer caracter debe estar en mayuscula'
					}
				}
			},
			nombres : {
				row : '.col-xs-12',
				row : '.col-md-6',
				validators : {
					notEmpty : {
						message : 'Este campo es obligatorio'
					},
					stringLength : {
						max : 100,
						message : 'Este campo solo permite 100 Caracteres'
					},
					regexp : {
						regexp : /^([A-Z(Ñ)]{1}[(ñáéíóú)a-z]*\s?){1,4}$/,
						message : 'El Primer caracter debe estar en mayuscula'
					}
				}
			},

			edocivil : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha seleccionado su Estado Civil',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},
			Estados : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha seleccionado su Estado de Nacimiento',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			Ciudad : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha seleccionado su Ciudad de Nacimiento',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			fechaN : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su Fecha de Nacimiento',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					date : {
						format : 'DD/MM/YYYY',
						message : 'La Fecha Ingresada no es Correcta'
					}
				}
			},

			edad : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha Ingresado su edad',
				excluded: false, 
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^[0-9_\.]+$/,
						message : 'Este campo es solo numeros'
					}
				}
			},

			sexo : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha seleccionado su Genero',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			etnia : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha seleccionado la Etnia a la que pertenece',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			discapacidad : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha seleccionado indicado si posee o no alguna Discapacidad',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			calle : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su la Avenida o Calle donde vive',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			urb : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su la Urbanización o Barrio donde vive',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			casa : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su la Edifico o Casa donde vive',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			pueblo : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su la Ciudad o Pueblo donde vive',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			Local : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado su la Localidad o Estado donde vive',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			codigo : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha Ingresado su edad',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^([0-9]{4})+$/,
						message : 'Debe Ingresar su Codigo Postal completo'
					}
				}
			},

			movil : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado su teléfono Movil',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^[0-9_\s]*$/,
						message : 'Debe ingresar solo numeros'
					}
				}
			},

			tlf : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha ingresado su teléfono Fijo',
				validators : {
					regexp : {
						regexp : /^[0-9_\s]*$/,
						message : 'Debe ingresar solo numeros'
					}
				}
			},

			email : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado su Correo',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						message : 'Debe colocar un correo valido'
					}
				}
			},

			rusnieu : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado N° RUSNIEU',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^([0-9]{11})+$/,
						message : 'Debe Ingresar su N° RUSNIEU completo'
					}
				}
			},

			carrera : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado la Carrera Asignada a la UMC',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			especialidad : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado la especialidad',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			graduacion : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha Ingresado N° RUSNIEU',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					between : {
						min : 0,
						max : 2016,
						message : 'El Año no puede superar el actual'
					}
				}
			},

			nota : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha Ingresado su Promedio de Nota',

				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					regexp : {
						regexp : /^[0-9_\,]+$/,
						message : 'Este campo es solo numeros'
					},
					between : {
						min : 10,
						max : 20,
						message : 'Su promedio de nota debe esta entre 10 - 20 puntos'
					}
				}
			},

			cnu : {
				row : '.col-xs-12',
				row : '.col-md-3',
				message : 'No ha seleccionado su Promedio en el CNU',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					},
					between : {
						min : 0,
						max : 100,
						message : 'Su promedio de nota debe esta entre 0 - 99,99 puntos'
					}
				},
				regexp : {
					regexp : /^[0-9_\,]+$/,
					message : 'Este campo es solo numeros'
				}
			},

			aspirante : {
				row : '.col-xs-12',
				row : '.col-md-3',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			periodo : {
				row : '.col-xs-12',
				row : '.col-md-3',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			Unidad : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado la Unidad donde Estudio',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			lugarU : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado el Lugar de la Unidad Educativa',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			municipioU : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado el Municipio de la Unidad donde Estudio',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			parroquiaU : {
				row : '.col-xs-12',
				row : '.col-md-6',
				message : 'No ha indicado la Parroquia de la Unidad Educativa',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			tipoU : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha indicado el Tipo de Unidad',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			internet : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha indicado si posee Acceso a Internet',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			},

			pregrado : {
				row : '.col-xs-12',
				row : '.col-md-4',
				message : 'No ha indicado si posee Estudios de Pregrado',
				validators : {
					notEmpty : {
						message : 'Este Campo es requerido'
					}
				}
			}
			//Fin de los Fields
		}
	});
});
