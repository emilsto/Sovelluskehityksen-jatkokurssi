package com.example.newsfetcher;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity implements NewsDataManagerListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void updateView(View view){
        NewsData currentNews = NewsDataManager.getInstance(getApplicationContext()).getCurrentNews(5);
        NewsDataManager.getInstance(getApplicationContext()).addListener(this);
    }

    @Override
    public void NewsUpdated(NewsData updatedNews) {
        //Update news information on screen
    }
}