Array.prototype.contains = function (val) {
  return this.indexOf(val) >= 0;
};

function askQuestion(questions, materials, next) {
  var qN = questions.length;

  var qId = Math.floor(Math.random() * qN);

  var question = questions[qId];

  questions.splice(qId, 1);


  $('#box h1')
    .fadeOut(0)
    .text(question.question)
    .fadeIn(300);

  $('#buttons a[href="#true"]').on('click', function (e) {
    e.preventDefault();

    $('#buttons a').off('click');

    answerQuestion(true, next);
  });

  $('#buttons a[href="#false"]').on('click', function (e) {
    e.preventDefault();

    $('#buttons a').off('click');

    answerQuestion(false, next);
  });

  $('#buttons a[href="#skip"]').on('click', function (e) {
    e.preventDefault();

    $('#buttons a').off('click');

    answerQuestion(null, next);
  });

  function answerQuestion(answer, next) {
    if (answer !== null) {
      var invalidValues = question.answers[answer];

      materials = materials.filter(function (m) {
        return !invalidValues.contains(m.id);
      });
    }

    if (materials.length >= 1 && questions.length >= 1) {
      askQuestion(questions, materials, next);
    } else {
      next(materials);
    }
  }
}

$(function () {

  NProgress.start();

  $.getJSON('data/materials.json', function (sMaterials) {

    NProgress.set(0.5);

    $.getJSON('data/questions.json', function (sQuestions) {

      NProgress.done();

      askQuestion(sQuestions, sMaterials, function (materials) {
        var result = 'Résultat: ';

        var nMaterials = materials.length;

        if (nMaterials < 1) {
          result += 'Aucune matériau correspondant n\'a été trouvé';
        } else if (nMaterials === 1) {
          result += 'Le seul matériau correspondant est <b>' + materials[0].phrase + '</b>';
        } else if (nMaterials > sMaterials.length - 2) {
          result = 'Il y a trop de matériaux correspondants. Veuillez affiner votre recherche';
        } else {
          result += 'Les matériaux correspondants sont ';

          materials.forEach(function (m, i) {
            m.phrase = '<b>' + m.phrase + '</b>';

            if (nMaterials === i + 2) {
              result += m.phrase + ' ';
            } else if (nMaterials === i + 1) {
              result += 'et ' + m.phrase;
            } else {
              result += m.phrase + ', ';
            }
          });
        }

        $('#box h1')
          .fadeOut(0)
          .html(result)
          .fadeIn(300);

        $('#buttons').empty();
        $('#buttons').append('<a href="#rerun">Recommencer</a>');

        $('#buttons a[href="#rerun"]').on('click', function (e) {
          e.preventDefault();

          location.reload();
        });
      });

    });

  });

});
