/** Various util function for dealing with dates*/
export default class DateUtils {
  //UTILS
  static twoDigit(num) {
    if (num>=0 && num<10) return '0'+num;
    return num;
  }

  static fourDigit(num) {
    if(num>=1000) return num;
    return ("000" + num).slice(-4);
  }


  //DATE TO STRING METHODS
  static toYYYYMMDD(date) {
    if (!date) return "";
    return DateUtils.fourDigit(date.getFullYear())+"-" +
           DateUtils.twoDigit(date.getMonth()+1)+"-"+
           DateUtils.twoDigit(date.getDate());
  }


}
