module.exports = {

  enumeration: {
    get: function (value) { // MY_CONSTANT > My constant
      if (!value) {
        return "";
      }
      return Format.camelCase(value.replace(/_/g," "));
    },
    set: function (value) { //My Constant > MY_CONSTANT
      return value.replace(/ /g,"_").toUpperCase();
    }
  },

  money: function (value, defaultValue) {
    if (value == 0) {
      return defaultValue == null ? "FREE" : defaultValue;
    }

    return value && '£' + ((value).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }));
  },

  age: function (value) { //DATE > 10
    if (value) {
      var a = moment(),
        b = moment(value);
      return a.diff(b, 'years');
    }
    return value;
  },

  dateAndTime: function (value) {
    return Format.moment(value, 'MMMM Do YYYY, h:mm a');
  },

  monthAndYear: function (value) {
    return Format.moment(value, 'MMM YYYY');
  },

  time: function (value) { //DATE > 10:00pm
    return Format.moment(value, 'hh:mm a');
  },

  countdown: function (value) { //DATE > NOW || 10d1h10m
    var duration;
    if (value) {
      if (Utils.isInPast(value)) {
        return 'Now';
      }
      duration = moment.duration({ to: moment(value), from: moment() });
      return Format.nearestTen(parseInt(duration.asDays())) + 'd ' + Format.nearestTen(duration.hours()) + 'h '
        + Format.nearestTen(duration.minutes()) + 'm';
    }
    return value;
  },

  countdownMinutes: function (value) { //DATE > 10:05
    var duration;
    if (value) {
      duration = moment.duration({ to: moment(value), from: moment() });
      return Format.nearestTen(parseInt(duration.minutes())) + ':' + Format.nearestTen(duration.seconds());
    }
    return value;
  },

  ago: function (value) { //DATE > 5 minutes ago (see moment docs)
    if (value) {
      var m = moment(value);
      return m.fromNow();
    }
    return value;
  },

  moment: function (value, format) { //DATE, hh:mm > 23:00
    if (value) {
      var m = moment(value);
      return m.format(format);
    }
    return value;
  },

  nearestTen: function (value) { //11 > 10
    return value >= 10 ? value : '0' + value;
  },

  camelCase: function (val) { //hello world > Hello world
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  },

  fullName: function (person) { //{firstName:'Kyle', lastName:'Johnson'} > Kyle Johnson
    if (!person) {
      return '';
    }
    var fn = person.firstName || '',
      sn = person.lastName || '';

    return fn ? Format.camelCase(fn) + ' ' + Format.camelCase(sn) : Format.camelCase(sn);
  },

  initialAndLastName: function (person) { //{firstName:'Kyle', lastName:'Johnson'} > K. Johnson
    var value = Format.fullName(person),
      words;

    if (!value) {
      return value;
    }

    words = value.split(' ');

    if (words.length > 1) {
      return words[0].charAt(0).toUpperCase() + '.' + ' ' + words[words.length - 1];
    }

    return value;
  },

  cssImage: function (value) { //lol.jpg  > url('lol.jpg')
    return value ? 'url("' + value + '")' : 'none';
  },

  ordinal: function (value) {
    var s = ["th", "st", "nd", "rd"],
      v = value % 100;
    return value ? value + (s[(v - 20) % 10] || s[v] || s[0]) : '';
  },

  truncateText: function (text, numberOfChars) { //lol,1 > l...
    if (text) {
      if (text.length > numberOfChars) {
        return text.substring(0, numberOfChars) + '...';
      }
    }
    return text;
  },

  removeAccents: function (str) { //Sergio Agüero > Sergio Aguero
    if (!str) {
      return str;
    }

    for (var i = 0; i < Utils.accents.length; i++) {
      str = str.replace(Utils.accents[i].letters, Utils.accents[i].base);
    }

    return str;
  }
};
