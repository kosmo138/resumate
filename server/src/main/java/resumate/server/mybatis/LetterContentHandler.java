package resumate.server.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import resumate.server.dto.LetterContent;

public class LetterContentHandler extends BaseTypeHandler<List<LetterContent>> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<LetterContent> parameter, JdbcType jdbcType)
            throws SQLException {
        Gson gson = new Gson();
        ps.setString(i, gson.toJson(parameter));
    }

    @Override
    public List<LetterContent> getNullableResult(ResultSet rs, String columnName)
            throws SQLException {
        String json = rs.getString(columnName);
        Gson gson = new Gson();
        return json == null ? null
                : gson.fromJson(json, new TypeToken<List<LetterContent>>() {
                }.getType());
    }

    @Override
    public List<LetterContent> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String json = rs.getString(columnIndex);
        Gson gson = new Gson();
        return json == null ? null
                : gson.fromJson(json, new TypeToken<List<LetterContent>>() {
                }.getType());
    }

    @Override
    public List<LetterContent> getNullableResult(CallableStatement cs, int columnIndex)
            throws SQLException {
        String json = cs.getString(columnIndex);
        Gson gson = new Gson();
        return json == null ? null
                : gson.fromJson(json, new TypeToken<List<LetterContent>>() {
                }.getType());
    }
}
