var jmlRuas_differential = 0;
var jmlRuas_integral = 0;

// Differential functions
function mulai_diff()
{
	jmlRuas_differential = $('#jmlRuas-differential').val();

	if(jmlRuas_differential!=0 && isInt(jmlRuas_differential)) {
		$('#form-differential').html('');
		html = '<h3 class="text-muted"><i>f</i>&nbsp;(<i>x</i>)</h3>';

		for (var i=1; i<=jmlRuas_differential; i++) {
			html = html + '<input size="1" maxlength="5" class="input-konstanta" placeholder="C" required="required" type="number" id="pembilang-differential'+i+'" name="pembilang'+i+'" ></input>';
			html = html + '<input size="1" maxlength="5" class="input-variabel" placeholder="X" type="text" id="variabel-differential'+i+'" name="variabel'+i+'" ></input>';
			html = html + '<input size="1" maxlength="5" class="input-pangkat" placeholder="n" type="number" min="0" id="pangkat-differential'+i+'" name="pangkat'+i+'" ></input>';
			if(i!=jmlRuas_differential)
			{
				html = html + '<select style="width:45px;" class="input-combobox" id="operator-differential'+i+'" name="operator"><option value="+">+</option><option value="-">-</option></select>';
			}
		}

		html = html + '<div><br><button onclick="hitung_diff();" class="btn btn-block btn-success">Hitung</button></div>';
		$('#form-differential').append(html);
		$('#result-differential').hide();
	} else {
		alert('Error: Jumlah ruas harus bernilai angka positif dan lebih dari 0');
	}
}

function cek_urutan_pangkat_diff()
{
	for (var ii=1; ii<=jmlRuas_differential; ii++) {
		var P = $("#pangkat-differential" + ii).val();
	}
}

function hitung_diff()
{
	//cek_urutan_pangkat_diff();
	isi_hitung_diff();
}

function isi_hitung_diff()
{
	jawaban = '';
	pertanyaan = '';
	$('#result-differential').show();
	$('#result-differential').html('');

	for (var ii = 1; ii <= jmlRuas_differential; ii++) {
		pembilang = ($("#pembilang-differential"+ii).length) ? $("#pembilang-differential" + ii).val() : '';
		variabel = ($("#variabel-differential"+ii).length) ? $("#variabel-differential" + ii).val().toUpperCase() : '';
		pangkat = ($("#pangkat-differential"+ii).length) ? $("#pangkat-differential" + ii).val() : '';
		operator = ($("#operator-differential"+ii).length) ? $("#operator-differential" + ii).val() : '';

		pembilang_akhir = pembilang * pangkat;
		pangkat_akhir 	= pangkat - 1;
		
		if (variabel && isInt(variabel)) {
			alert('Error: Variabel harus berupa huruf');
			return false;
		}

		if(pangkat && !isInt(pangkat)) {
			alert('Error: Pangkat harus bernilai angka positif');
			return false;
		} else if(pangkat == "" && pangkat == 0) {		
			jawaban = jawaban + '';
		} else if(pangkat_akhir == 0) {		
			jawaban = jawaban + ' ' + pembilang_akhir + ' ';
		} else if(pangkat_akhir == 1) {		
			jawaban = jawaban + ' ' + pembilang_akhir + ' <i>' + variabel + '</i> ';
		} else {
			jawaban = jawaban + ' ' + pembilang_akhir + ' <i>' + 
			variabel + '</i><sup><small> ' + pangkat_akhir + '</small></sup> ';
		}
				
		cek_pangkat_akhir = $("#pangkat-differential" + jmlRuas_differential).val();

		if(cek_pangkat_akhir == " " || cek_pangkat_akhir == "" || cek_pangkat_akhir == "0") {
			//kalau pangkat terakhir gak diisi
			var pm = jmlRuas_differential-2;
			if(ii <= pm ) {
				jawaban = jawaban + operator + ' ';
			}
				console.log(pm);
		}else {
			//kalau semua pangkat diisi
			var pm = jmlRuas_differential-1;
			if(ii <= pm) {
				jawaban = jawaban + operator + ' ';
			}
		}

		pertanyaan = pertanyaan + ' ' + pembilang + ' <i>' + variabel + 
						'</i><sup><small> ' + pangkat + '</small></sup> ' + operator + ' ';
	}

	$('#result-differential').append("<br>"+
									"<div class=\"well text-left\">" +
										"<p class=\"text-muted\">Pertanyaan:</p>" +
										"<h3 class=\"text-muted\"><i>f</i>&nbsp;(<i>x</i>)</h3>" +
										"<h4>" + pertanyaan + "</h4><hr style=\"border-color: #D0D0D0 -moz-use-text-color -moz-use-text-color;\">" +
										"<p class=\"text-muted\">Jawaban:</p>" +
										"<h3 class=\"text-muted\"><i>f'</i>&nbsp;(<i>x</i>)</h3>" +
										"<h4>" + jawaban + "</h4>" +
									"</div>" +
									"<div>" +
										"<a href=\"index.html\" class=\"btn btn-warning\"><i class=\"fa fa-refresh\"></i> Refresh</a>&nbsp;&nbsp;" +
										"<a href=\"javascript:;\" onclick=\"reset_diff();\" class=\"btn btn-primary\"><i class=\"fa fa-eraser\"></i> Reset</a>" +
									"</div>");
}

function reset_diff() {
	$('#jmlRuas-differential').val('');
	$('#result-differential').hide();
	$('#result-differential').html('');
	$('#form-differential').html('');
}


// Integral functions
function mulai_integral()
{
	jmlRuas_integral = $('#jmlRuas-integral').val();

	if(jmlRuas_integral!=0 && isInt(jmlRuas_integral)) {
		$('#form-integral').html('');
		html = '<h3 class="text-muted"><i>∫</i></h3>';

		for (var i = 1; i <= jmlRuas_integral; i++) {
			html = html + '<input size="1" class="input-konstanta" placeholder="C" maxlength="5" type="number" id="pembilang-integral'+i+'" name="pembilang'+i+'" ></input>';
			html = html + '<input size="1" maxlength="5" class="input-variabel" placeholder="X" type="text" id="variabel-integral'+i+'" name="variabel'+i+'" ></input>';
			html = html + '<input size="1" class="input-pangkat" placeholder="n" maxlength="5" type="number" min="0" id="pangkat-integral'+i+'" name="pangkat'+i+'" ></input>';
			
			if(i!=jmlRuas_integral) {
				html = html + '<select style="width:45px;" class="input-combobox" id="operator-integral'+i+'" name="operator"><option value="+">+</option><option value="-">-</option></select>';
			}
		}

		html = html + '<div><br><button onclick="hitung_integral()" class="btn btn-block btn-success">Hitung</button></div>';
		$('#form-integral').append(html);
		$('#result-integral').hide();
	}
	else {
		alert('Error: Jumlah ruas harus bernilai angka positif dan lebih dari 0');
	}
}

function hitung_integral()
{
	jawaban = '';
	pertanyaan = '';
	$('#result-integral').show();
	$('#result-integral').html('');

	for (var a = 1; a <= jmlRuas_integral; a++) {
		pembilang = ($("#pembilang-integral"+a).length) ? $("#pembilang-integral" + a).val() : '';
		variabel = ($("#variabel-integral"+a).length) ? $("#variabel-integral" + a).val().toUpperCase() : '';
		pangkat = ($("#pangkat-integral"+a).length) ? $("#pangkat-integral" + a).val() : '';
		operator = ($("#operator-integral"+a).length) ? '<span class="baseline">' + $("#operator-integral" + a).val() + '</span>' : '';

		if (variabel && isInt(variabel)) {
			alert('Error: Variabel harus berupa huruf');
			return false;
		}
		
		if(pangkat && !isInt(pangkat)) {
			alert('Error: Pangkat harus bernilai angka positif');
			return false;
		} else if(pangkat != "" && pangkat != 0) {
			pangkat_akhir = pangkat*1+1;
			pembilang_akhir = '<div class="fraction">' +
										'<span class="numerator">' + pembilang + '</span><br>' +
										'<span class="denominator">' + pangkat_akhir + '</span>' +
									'</div>';
			jawaban = jawaban + ' ' + pembilang_akhir +
											'<span class="baseline">&nbsp;<i>' + variabel + '</i><sup><small>' + pangkat_akhir + '</small></sup></span> ' +
											operator + ' ';
		} else {
			jawaban = jawaban + pembilang + '&nbsp;<i>' + variabel + '</i>&nbsp;' + operator;
		}

		pertanyaan = pertanyaan + ' ' + pembilang +
											'<span class="baseline">&nbsp;<i>' + variabel + '</i><sup><small>' + pangkat + '</small></sup></span> ' +
											operator + ' ';
	}

	pertanyaan = pertanyaan + ' <i>dx</i>'
	jawaban = jawaban + '+ <span class="baseline"><i>C</i></span>';

	$('#result-integral').append("<br>" +
									"<div class=\"well text-left\">" +
										"<p class=\"text-muted\">Pertanyaan:</p>" +
										"<div class=\"hybrid\">" +
											"<h3 class=\"text-muted\"><i>∫</i></h3>" +
											"<h4>" + pertanyaan + "</h4><hr style=\"border-color: #D0D0D0 -moz-use-text-color -moz-use-text-color;\">" +
											"<p class=\"text-muted\">Jawaban:</p>" +
											"<h3 class=\"text-muted\"><i>f</i>&nbsp;(<i>x</i>)</h3>" +
											"<h4>" + jawaban + "</h4>" +
										"</div>"+
									"</div>" +
									"<div>" +
										"<a href=\"index.html\" class=\"btn btn-warning\"><i class=\"fa fa-refresh\"></i> Refresh</a>&nbsp;&nbsp;" +
										"<a href=\"javascript:;\" onclick=\"reset_integral();\" class=\"btn btn-primary\"><i class=\"fa fa-eraser\"></i> Reset</a>" +
									"</div>");
}

function reset_integral() {
	$('#jmlRuas-integral').val('');
	$('#result-integral').hide();
	$('#result-integral').html('');
	$('#form-integral').html('');
}

function isInt(value) {
   return /^\+?(0|[1-9]\d*)$/.test(value);
}