package com.example.vatupassi;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Context;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import java.util.List;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void startSensors(View view){
        SensorManager sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        List<Sensor> sensorList = sensorManager.getSensorList(Sensor.TYPE_ALL);

        Sensor accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if (accelerometer != null) {
            sensorManager.registerListener( this, accelerometer, SensorManager.SENSOR_DELAY_UI);
        }
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        //Sensorin muutokset täällä
        float xSensor = sensorEvent.values[0];
        float ySensor = sensorEvent.values[1];
        float zSensor = sensorEvent.values[2];

        //Kirjoitetaan sensorien arvot näytölle
        TextView sensorTextView = (TextView) findViewById(R.id.sensorValuesTextView);
        TextView isParallel = (TextView) findViewById(R.id.isParellelTextView);
        sensorTextView.setText("X: " + xSensor + "\nY: " + ySensor + "\nZ: " + zSensor);

        if( xSensor < 0.02 && xSensor > -0.02) {
            isParallel.setText("Parallel!");
        }
        else {
            isParallel.setText("");
        }

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}