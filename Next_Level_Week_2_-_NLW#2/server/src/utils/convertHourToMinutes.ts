export default function convertHourToMinutes(time:string) {
    //separa a hora e os minutos de tempo( 0:00 )
    const [hour, minutes] = time.split(':').map(Number); // transforma os elementos de time que sao strings em numero
    const timeInMinutes = ( hour * 60 ) + minutes;


    return timeInMinutes;
}