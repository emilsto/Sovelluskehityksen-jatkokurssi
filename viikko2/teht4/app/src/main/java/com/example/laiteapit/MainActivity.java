package com.example.laiteapit;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements LocationListener {

    private LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void locateUser(View view) {
        locationManager = ( LocationManager) getSystemService(Context.LOCATION_SERVICE);
        //Kysytään lokaatio
        TextView locationTextView = findViewById(R.id.locationTextView);


        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
        PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED){
            //ask for runtime permission
            String permissions [] = new String[] {
                    Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.ACCESS_FINE_LOCATION
            };
            ActivityCompat.requestPermissions( this, permissions, 0 );
        }

        //Oikeudet kunnossa, rekisteröidytään kuuntelemaan location -päivityksiä
        locationManager.requestLocationUpdates( LocationManager.GPS_PROVIDER, 0, 0, this);

        /*
        try {
            Location currentLocation = locationManager.getLastKnownLocation(locationManager.GPS_PROVIDER);
            Log.d("LATE_APISOVELLUS", "Lat: " + currentLocation.getLatitude() + "Lng: " + currentLocation.getLongitude());
            if( currentLocation != null) {
                locationTextView.setText("Lat: " + currentLocation.getLatitude() + "Lng: " + currentLocation.getLongitude());
            }
        }
        catch ( SecurityException e) {
            e.printStackTrace();
            Log.d("LATE_APISOVELLUS", "EI OIKEUTTA PAIKKATIETOIHIN" );
        }
        */

    }


    

    @Override
    public void onLocationChanged(@NonNull Location location) {
        //uusi lokaatio
        TextView locationTextView = findViewById(R.id.locationTextView);
        locationTextView.setText("Lat: " + location.getLatitude() + "\nLng: " + location.getLongitude());
    }
}