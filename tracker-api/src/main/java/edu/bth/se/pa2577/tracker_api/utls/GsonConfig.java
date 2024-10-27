package edu.bth.se.pa2577.tracker_api.utls;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDate;

public class GsonConfig {

  public static Gson getGson() {
    return new GsonBuilder()
      .registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter())
      .create();
  }
}
