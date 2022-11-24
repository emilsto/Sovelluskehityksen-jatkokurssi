package com.example.lottoapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private MyChargerBroadcastReciver myChargerBroadcastReciver;
    private MyLottoBroadcastReciver myLottoBroadcastReciver;


    // TODO: Aseta aktiviteetti kuuntelemaan laturin tilaa
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        myChargerBroadcastReciver = new MyChargerBroadcastReciver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        intentFilter.addAction(Intent.ACTION_POWER_CONNECTED);

        myLottoBroadcastReciver = new MyLottoBroadcastReciver();
        IntentFilter lottoIntentFilter = new IntentFilter("com.tamk.mylotto:LOTTONUMBER");
        registerReceiver( myLottoBroadcastReciver, lottoIntentFilter);
        //register reciver to listen to
        registerReceiver( myChargerBroadcastReciver, intentFilter);
    }

    public void startLottoService(View view) {
        //Start the MyLottoService -service and listen to service broadcasts
        Intent intent = new Intent( this, MyLottoService.class);
        intent.putExtra("LOTTO_NUMBER_AMOUNT", 7);
        startService( intent);
    }

    //inner class
    private class MyChargerBroadcastReciver extends BroadcastReceiver {


        @Override
        public void onReceive(Context context, Intent intent) {
            TextView chargerTextView = findViewById(R.id.chargerTextView);
            // Laturin kytkeminen kasitellaan taalla
            if (intent.getAction() == Intent.ACTION_POWER_CONNECTED) {
                // Laturi kytektty
                chargerTextView.setText("Power connected");
            }
            else if (intent.getAction() == Intent.ACTION_POWER_DISCONNECTED) {
                // Laturi irroitettu
                chargerTextView.setText("Power disconnected");

            }
        }
    }

    private class MyLottoBroadcastReciver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if ( intent.getAction() == "com.tamk.mylotto:LOTTONUMBER"){
                int[] lottoNumbers = intent.getIntArrayExtra("LOTTO_NUMBERS");
                TextView lottoTextView = findViewById(R.id.lottoTextView);
                //add the lotto numbers to the textview
                for (int i = 0; i < lottoNumbers.length; i++) {
                    lottoTextView.append(lottoNumbers[i] + " ");
                }
            }
        }


    }
}