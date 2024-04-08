package resumate.server.mybatis;

import java.util.List;

import org.apache.ibatis.type.BaseTypeHandler;

import resumate.server.dto.LetterContent;

public class LetterContentHandler extends BaseTypeHandler<List<LetterContent>> {
    @Override
    public void setNonNullParameter(java.sql.PreparedStatement ps, int i, List<LetterContent> parameter, org.apache.ibatis.type.JdbcType jdbcType) throws java.sql.SQLException {
        ps.setString(i, parameter.toString());
    }

    @Override
    public List<LetterContent> getNullableResult(java.sql.ResultSet rs, String columnName) throws java.sql.SQLException {
        return null;
    }

    @Override
    public List<LetterContent> getNullableResult(java.sql.ResultSet rs, int columnIndex) throws java.sql.SQLException {
        return null;
    }

    @Override
    public List<LetterContent> getNullableResult(java.sql.CallableStatement cs, int columnIndex) throws java.sql.SQLException {
        return null;
    }
}
