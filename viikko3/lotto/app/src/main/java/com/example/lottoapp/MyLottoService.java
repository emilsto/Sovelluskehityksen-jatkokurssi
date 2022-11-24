package com.example.lottoapp;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class MyLottoService extends Service {
    private int mLottoNumberAmmount = 0;

    public MyLottoService() {
    }

    @Override
    public int onStartCommand( Intent intent, int lags, int startId){
        //Here is where the service is implemented
        mLottoNumberAmmount = intent.getIntExtra("LOTTO_NUMBER_AMOUNT", 0);

        new Thread( () -> {
            //New thread to run in background
            // array to store the lotto numbers
            int[] lottoNumbers = new int[mLottoNumberAmmount];
        
            for (int i = 0; i < mLottoNumberAmmount; i++) {
                int lottonumero = (int) (Math.random() * 40);
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                lottoNumbers[i] = lottonumero;
            }
            Intent lottoNumberIntent = new Intent("com.tamk.mylotto:LOTTONUMBER");
            lottoNumberIntent.putExtra("LOTTO_NUMBERS", lottoNumbers);
            sendBroadcast(lottoNumberIntent);
        }
        ).start();

        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}