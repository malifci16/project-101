package edu.bth.se.pa2577.tracker_api.utls;

import com.google.gson.JsonDeserializer;
import com.google.gson.JsonSerializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateTypeAdapter implements JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {

  private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

  @Override
  public JsonElement serialize(LocalDate src, Type typeOfSrc, JsonSerializationContext context) {
    return new JsonPrimitive(src.format(formatter));  // Serialize LocalDate to string
  }

  @Override
  public LocalDate deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
    return LocalDate.parse(json.getAsString(), formatter);  // Deserialize string to LocalDate
  }
}
